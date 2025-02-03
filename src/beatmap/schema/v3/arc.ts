import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v3/arc.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Arc`.
 */
export const arc: ISchemaContainer<IWrapArcAttribute, IArc> = {
   serialize(data) {
      return {
         b: data.time,
         c: data.color,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         mu: data.lengthMultiplier,
         tb: data.tailTime,
         tx: data.tailPosX,
         ty: data.tailPosY,
         tc: data.tailDirection,
         tmu: data.tailLengthMultiplier,
         m: data.midAnchor,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         color: data.c ?? 0,
         posX: data.x ?? 0,
         posY: data.y ?? 0,
         direction: data.d ?? 0,
         lengthMultiplier: data.mu ?? 0,
         laneRotation: 0,
         tailTime: data.tb ?? 0,
         tailPosX: data.tx ?? 0,
         tailPosY: data.ty ?? 0,
         tailDirection: data.tc ?? 0,
         tailLengthMultiplier: data.tmu ?? 0,
         midAnchor: data.m ?? 0,
         tailLaneRotation: 0,
         customData: data.customData ?? {},
      };
   },
};
