import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v3/arc.ts';
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createArc } from '../../core/arc.ts';

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
      return createArc({
         time: data.b,
         color: data.c,
         posX: data.x,
         posY: data.y,
         direction: data.d,
         lengthMultiplier: data.mu,
         tailTime: data.tb,
         tailPosX: data.tx,
         tailPosY: data.ty,
         tailDirection: data.tc,
         tailLengthMultiplier: data.tmu,
         midAnchor: data.m,
         customData: data.customData,
      });
   },
};
