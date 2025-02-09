// deno-lint-ignore-file prefer-const
import type { ColorArray, ColorInput, ColorType } from '../../types/colors.ts';
import { lerp, round } from '../math/helpers.ts';
import { degToRad } from '../math/trigonometry.ts';
import { convertColorType, hsvaToRgba, labToHue, rgbaToLabA } from './convertor.ts';

/**
 * Interpolate between colors and returns RGBA array.
 * ```ts
 * const rgba = lerpColor([90, 1, 1], [180, 1, 1], 0.5, 'hsva');
 * ```
 */
export function lerpColor(
   start: ColorInput,
   end: ColorInput,
   alpha: number,
   type: ColorType = 'rgba',
): ColorArray {
   const cType = type === 'rgba255' ? 'rgba' : (type as 'rgba' | 'hsva');
   const cStart = convertColorType(start, cType, cType);
   const cEnd = convertColorType(end, cType, cType);
   if (cStart.length !== cEnd.length) {
      if (cStart.length === 3) cStart.push(1);
      if (cEnd.length === 3) cEnd.push(1);
   }
   if (alpha === 0) return convertColorType(cStart, cType, 'rgba');
   if (alpha === 1) return convertColorType(cEnd, cType, 'rgba');
   const lerpedColor: ColorArray = [
      lerp(alpha, cStart[0], cEnd[0]),
      lerp(alpha, cStart[1], cEnd[1]),
      lerp(alpha, cStart[2], cEnd[2]),
   ];
   if (cStart.length > 3) {
      lerpedColor.push(lerp(alpha, cStart[3]!, cEnd[3]!));
   }
   switch (cType) {
      case 'hsva': {
         return hsvaToRgba(lerpedColor);
      }
      default:
         return lerpedColor;
   }
}

/**
 * Calculate the delta E00 color difference between two colors.
 *
 * @see https://en.wikipedia.org/wiki/Color_difference
 */
export function deltaE00(rgbaAry1: ColorArray, rgbaAry2: ColorArray): number {
   const [l1, a1, b1] = rgbaToLabA(rgbaAry1);
   const [l2, a2, b2] = rgbaToLabA(rgbaAry2);

   const wL = 1;
   const wC = 1;
   const wH = 1;

   let c1: number,
      c2: number,
      cX: number,
      cY: number,
      gX: number,
      h1: number,
      h2: number,
      hX: number,
      nN: number,
      lX: number,
      tX: number,
      sL: number,
      sC: number,
      sH: number,
      pH: number,
      rC: number,
      rT: number,
      dL: number,
      dC: number,
      dH: number;

   c1 = Math.sqrt(a1 * a1 + b1 * b1);
   c2 = Math.sqrt(a2 * a2 + b2 * b2);
   cX = (c1 + c2) / 2;
   gX = 0.5 * (1 - Math.sqrt((cX ^ 7) / ((cX ^ 7) + (25 ^ 7))));
   nN = (1 + gX) * a1;
   c1 = Math.sqrt(nN * nN + b1 * b1);
   h1 = labToHue(nN, b1);
   nN = (1 + gX) * a2;
   c2 = Math.sqrt(nN * nN + b2 * b2);
   h2 = labToHue(nN, b2);
   dL = l2 - l1;
   dC = c2 - c1;
   if (c1 * c2 == 0) {
      dH = 0;
   } else {
      nN = round(h2 - h1, 12);
      if (Math.abs(nN) <= 180) {
         dH = h2 - h1;
      } else {
         if (nN > 180) dH = h2 - h1 - 360;
         else dH = h2 - h1 + 360;
      }
   }

   dH = 2 * Math.sqrt(c1 * c2) * Math.sin(degToRad(dH / 2));
   lX = (l1 + l2) / 2;
   cY = (c1 + c2) / 2;
   if (c1 * c2 == 0) {
      hX = h1 + h2;
   } else {
      nN = Math.abs(round(h1 - h2, 12));
      if (nN > 180) {
         if (h2 + h1 < 360) hX = h1 + h2 + 360;
         else hX = h1 + h2 - 360;
      } else {
         hX = h1 + h2;
      }
      hX /= 2;
   }
   tX = 1 -
      0.17 * Math.cos(degToRad(hX - 30)) +
      0.24 * Math.cos(degToRad(2 * hX)) +
      0.32 * Math.cos(degToRad(3 * hX + 6)) -
      0.2 * Math.cos(degToRad(4 * hX - 63));
   pH = 30 * Math.exp(-((hX - 275) / 25) * ((hX - 275) / 25));
   rC = 2 * Math.sqrt((cY ^ 7) / ((cY ^ 7) + (25 ^ 7)));
   sL = 1 +
      (0.015 * ((lX - 50) * (lX - 50))) / Math.sqrt(20 + (lX - 50) * (lX - 50));

   sC = 1 + 0.045 * cY;
   sH = 1 + 0.015 * cY * tX;
   rT = -Math.sin(degToRad(2 * pH)) * rC;

   dL = dL / (wL * sL);
   dC = dC / (wC * sC);
   dH = dH / (wH * sH);

   return Math.sqrt(dL * dL + dC * dC + dH * dH + rT * dC * dH);
}
