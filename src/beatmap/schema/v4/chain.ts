import type { IChainContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createChain } from '../../core/chain.ts';

/**
 * Schema serialization for v4 `Chain`.
 */
export const chain: ISchemaContainer<IWrapChainAttribute, IChainContainer> = {
   serialize(data) {
      return {
         object: {
            hb: data.time,
            hr: data.laneRotation,
            tb: data.tailTime,
            tr: data.tailLaneRotation,
            i: 0,
            ci: 0,
            customData: {},
         },
         data: {
            c: data.color,
            x: data.posX,
            y: data.posY,
            d: data.direction,
            a: 0,
            customData: {},
         },
         chainData: {
            tx: data.tailPosX,
            ty: data.tailPosY,
            c: data.sliceCount,
            s: data.squish,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return createChain({
         time: data.object?.hb,
         laneRotation: data.object?.hr,
         color: data.data?.c,
         posX: data.data?.x,
         posY: data.data?.y,
         direction: data.data?.d,
         tailTime: data.object?.tb,
         tailLaneRotation: data.object?.tr,
         tailPosX: data.chainData?.tx,
         tailPosY: data.chainData?.ty,
         sliceCount: data.chainData?.c,
         squish: data.chainData?.s,
         customData: data.chainData?.customData,
      });
   },
};
