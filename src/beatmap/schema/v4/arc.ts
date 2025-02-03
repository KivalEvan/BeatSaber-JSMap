import type { IArcContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Arc`.
 */
export const arc: ISchemaContainer<IWrapArcAttribute, IArcContainer> = {
   serialize(data) {
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
   },
   deserialize(data) {
      return {
         time: data.object?.hb ?? 0,
         laneRotation: data.object?.hr ?? 0,
         tailTime: data.object?.tb ?? 0,
         tailLaneRotation: data.object?.tr ?? 0,
         color: data.headData?.c ?? 0,
         posX: data.headData?.x ?? 0,
         posY: data.headData?.y ?? 0,
         direction: data.headData?.d ?? 0,
         lengthMultiplier: data.data?.m ?? 0,
         tailPosX: data.tailData?.x ?? 0,
         tailPosY: data.tailData?.y ?? 0,
         tailDirection: data.tailData?.d ?? 0,
         tailLengthMultiplier: data.data?.tm ?? 0,
         midAnchor: data.data?.a ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
