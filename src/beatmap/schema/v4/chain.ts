import type { IChainContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import { deepCopy } from '../../../utils/misc.ts';

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
      return {
         time: data.object?.hb ?? 0,
         laneRotation: data.object?.hr ?? 0,
         color: data.data?.c ?? 0,
         posX: data.data?.x ?? 0,
         posY: data.data?.y ?? 0,
         direction: data.data?.d ?? 0,
         tailTime: data.object?.tb ?? 0,
         tailLaneRotation: data.object?.tr ?? 0,
         tailPosX: data.chainData?.tx ?? 0,
         tailPosY: data.chainData?.ty ?? 0,
         sliceCount: data.chainData?.c ?? 0,
         squish: data.chainData?.s ?? 0,
         customData: data.chainData?.customData ?? {},
      };
   },
};
