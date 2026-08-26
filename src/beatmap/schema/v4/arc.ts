import type { IArcContainer } from './types/container.ts';
import type { IWrapArc } from '../wrapper/types/arc.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createArc } from '../wrapper/arc.ts';

/** Serialize beatmap v4 `Arc` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeArc(data: IWrapArc): IArcContainer {
   return {
      object: {
         ai: 0,
         hb: data.time,
         hi: 0,
         hr: data.laneRotation,
         tb: data.tailTime,
         ti: 0,
         tr: data.tailLaneRotation,
         customData: {},
      },
      data: {
         m: data.lengthMultiplier,
         tm: data.tailLengthMultiplier,
         a: data.midAnchor,
         customData: deepCopy(data.customData),
      },
      headData: {
         c: data.color,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         a: 0,
         customData: {},
      },
      tailData: {
         c: data.color,
         x: data.tailPosX,
         y: data.tailPosY,
         d: data.tailDirection,
         a: 0,
         customData: {},
      },
   };
}

/** Deserialize schema object into beatmap v4 `Arc` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeArc(data: IArcContainer): IWrapArc {
   return createArc({
      time: data.object?.hb,
      laneRotation: data.object?.hr,
      tailTime: data.object?.tb,
      tailLaneRotation: data.object?.tr,
      color: data.headData?.c,
      posX: data.headData?.x,
      posY: data.headData?.y,
      direction: data.headData?.d,
      lengthMultiplier: data.data?.m,
      tailPosX: data.tailData?.x,
      tailPosY: data.tailData?.y,
      tailDirection: data.tailData?.d,
      tailLengthMultiplier: data.data?.tm,
      midAnchor: data.data?.a,
      customData: data.data?.customData,
   });
}
