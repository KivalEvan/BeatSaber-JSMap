import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IChain } from '../../../types/beatmap/v3/chain.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Chain`.
 */
export const chain: ISchemaContainer<IWrapChainAttribute, IChain> = {
   serialize(data) {
      return {
         b: data.time,
         c: data.color,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         tb: data.tailTime,
         tx: data.tailPosX,
         ty: data.tailPosY,
         sc: data.sliceCount,
         s: data.squish,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         laneRotation: 0,
         color: data.c ?? 0,
         posX: data.x ?? 0,
         posY: data.y ?? 0,
         direction: data.d ?? 0,
         tailTime: data.tb ?? 0,
         tailLaneRotation: 0,
         tailPosX: data.tx ?? 0,
         tailPosY: data.ty ?? 0,
         sliceCount: data.sc ?? 0,
         squish: data.s ?? 0,
         customData: data.customData ?? {},
      };
   },
};
