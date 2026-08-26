import type { IChain } from './types/chain.ts';
import type { IWrapChain } from '../wrapper/types/chain.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createChain } from '../wrapper/chain.ts';

/** Serialize beatmap v3 `Chain` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeChain(data: IWrapChain): IChain {
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
}

/** Deserialize schema object into beatmap v3 `Chain` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeChain(data: IChain): IWrapChain {
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
}
