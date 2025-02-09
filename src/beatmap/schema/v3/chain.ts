import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IChain } from '../../../types/beatmap/v3/chain.ts';
import type { IWrapChain } from '../../../types/beatmap/wrapper/chain.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createChain } from '../../core/chain.ts';

/**
 * Schema serialization for v3 `Chain`.
 */
export const chain: ISchemaContainer<IWrapChain, IChain> = {
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
      return createChain({
         time: data.b,
         color: data.c,
         posX: data.x,
         posY: data.y,
         direction: data.d,
         tailTime: data.tb,
         tailPosX: data.tx,
         tailPosY: data.ty,
         sliceCount: data.sc,
         squish: data.s,
         customData: data.customData,
      });
   },
};
