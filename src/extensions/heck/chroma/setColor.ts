import { logger } from '../../../logger.ts';
import { convertColorType } from '../../../utils/colors/convertor.ts';
import { lerpColor } from '../../../utils/colors/helpers.ts';
import { normalize } from '../../../utils/math/helpers.ts';
import { settings } from './settings.ts';
import type {
   IChromaObject,
   ISetColorGradientOptions,
   ISetColorOptions,
   ISetColorRangeOptions,
} from './types/colors.ts';

function tag(name: string): string[] {
   return ['ext', 'chroma', 'color', name];
}

export function setColor<T extends Pick<IChromaObject, 'customData'>>(
   objects: T[],
   options: ISetColorOptions,
): void {
   const opt: Required<ISetColorOptions> = {
      color: options.color,
      colorType: options.colorType ?? (settings.colorType || 'hsva'),
   };
   const color = convertColorType(opt.color, opt.colorType);
   objects.forEach((obj) => {
      obj.customData.color = color;
   });
}

export function setColorGradient<
   T extends Pick<IChromaObject, 'time' | 'customData'>,
>(objects: T[], options: ISetColorGradientOptions) {
   if (!objects.length) {
      logger.tWarn(tag('setColorGradient'), 'No object(s) received.');
      return;
   }
   const opt: Required<ISetColorGradientOptions> = {
      offsetStart: options.offsetStart,
      offsetEnd: options.offsetEnd,
      colorStart: options.colorStart,
      colorEnd: options.colorEnd,
      colorType: options.colorType ?? 'rgba',
      easingColor: options.easingColor ??
         function (x: number) {
            return x;
         },
   };
   const startTime = objects.at(0)!.time + opt.offsetStart;
   const endTime = objects.at(-1)!.time + opt.offsetEnd;
   objects.forEach((obj) => {
      const norm = normalize(obj.time, startTime, endTime);
      const color = lerpColor(
         opt.colorStart,
         opt.colorEnd,
         opt.easingColor(norm),
         opt.colorType,
      );
      obj.customData.color = color;
   });
}

export function setColorRandom<
   T extends Pick<IChromaObject, 'time' | 'customData'>,
>(objects: T[], options: ISetColorRangeOptions) {
   const opt: Required<ISetColorRangeOptions> = {
      offsetStart: options.offsetStart,
      offsetEnd: options.offsetEnd,
      color1: options.color1,
      color2: options.color2,
      colorType: options.colorType ?? 'rgba',
   };
   let random = 0;
   let prevTime = 0;
   for (let i = 0, l = objects.length; i < l; i++) {
      if (objects[i].time > prevTime + 0.001) {
         random = Math.random();
      }
      const color = lerpColor(opt.color1, opt.color2, random, opt.colorType);
      objects[i].customData._color = color;
      prevTime = objects[i].time;
   }
}
