import type { IArc } from './types/arc.ts';
import type { IWrapArc } from '../wrapper/types/arc.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createArc } from '../wrapper/arc.ts';

/** Serialize beatmap v3 `Arc` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeArc(data: IWrapArc): IArc {
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
}

/** Deserialize schema object into beatmap v3 `Arc` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeArc(
   data: IArc,
   options?: DeserializationOptions,
): IWrapArc {
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
   }, options);
}
