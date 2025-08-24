import type { IWrapChain, IWrapChainLink } from './types/chain.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { Vector2 } from '../../../types/vector.ts';
import { vectorAdd, vectorMagnitude, vectorMul, vectorSub } from '../../../utils/math/vector.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { lerp, mod } from '../../../utils/math/helpers.ts';
import { degToRad, radToDeg } from '../../../utils/math/trigonometry.ts';
import { resolveGridPosition, resolveGridTailPosition } from '../../helpers/core/gridObject.ts';
import { resolveNoteAngle } from '../../helpers/core/baseNote.ts';
import { bezierQuad } from '../../../utils/math/bezier.ts';

export function createChainLink(
   data: DeepPartial<IWrapChainLink> = {},
): IWrapChainLink {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: data.color ?? 0,
      direction: data.direction ?? 0,
      angle: data.angle ?? 0,
      laneRotation: data.laneRotation ?? 0,
      chain: null,
      customData: deepCopy({ ...data.customData }),
   };
}

export function createChainLinks(
   chain: IWrapChain,
   options: {
      getPosition?: (chain: IWrapChain) => Vector2;
      getTailPosition?: (chain: IWrapChain) => Vector2;
      getAngle?: (chain: IWrapChain) => number;
   },
): IWrapChainLink[] {
   const position = options.getPosition?.(chain) ?? resolveGridPosition(chain);
   const tailPosition = options.getPosition?.(chain) ?? resolveGridTailPosition(chain);
   const angle = options.getAngle?.(chain) ?? resolveNoteAngle(chain.direction);

   const p2: Vector2 = vectorSub(tailPosition, position);

   const mag = vectorMagnitude(p2);
   const f = degToRad(angle - 90);
   const p1: Vector2 = vectorMul([Math.cos(f), Math.sin(f)], mag * 0.5);

   const result: IWrapChainLink[] = [];
   for (let index = 1; index < chain.sliceCount; index++) {
      const alpha = index / (chain.sliceCount - 1);
      let [pos, tangent] = bezierQuad([0, 0], p1, p2, alpha * chain.squish);
      pos = vectorAdd(position, pos);
      const linkTime = lerp(alpha, chain.time, chain.tailTime);
      result.push({
         time: linkTime,
         color: chain.color,
         posX: pos[0],
         posY: pos[1],
         direction: chain.direction,
         angle: mod(radToDeg(Math.atan2(tangent[1], tangent[0])), 360),
         laneRotation: chain.laneRotation,
         chain: chain,
         customData: {},
      });
   }

   return result;
}
