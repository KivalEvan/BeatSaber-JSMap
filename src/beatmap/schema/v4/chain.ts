import type { IChainContainer } from './types/container.ts';
import type { IWrapChain } from '../wrapper/types/chain.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createChain } from '../wrapper/chain.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `Chain` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeChain(data: IWrapChain): IChainContainer {
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
}

/** Deserialize schema object into beatmap v4 `Chain` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeChain(
   data: IChainContainer,
   options?: DeserializationOptions,
): IWrapChain {
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
   }, options);
}
