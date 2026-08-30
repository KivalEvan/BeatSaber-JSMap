import type { IIndexFilter } from './types/indexFilter.ts';
import type { IWrapIndexFilter } from '../wrapper/types/indexFilter.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createIndexFilter } from '../wrapper/indexFilter.ts';

/** Serialize beatmap v3 `Index Filter` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeIndexFilter(data: IWrapIndexFilter): IIndexFilter {
   return {
      f: data.type,
      p: data.p0,
      t: data.p1,
      r: data.reverse,
      c: data.chunks,
      n: data.random,
      s: data.seed,
      l: data.limit,
      d: data.limitAffectsType,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Index Filter` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeIndexFilter(
   data: IIndexFilter,
   options?: DeserializationOptions,
): IWrapIndexFilter {
   return createIndexFilter({
      type: data.f,
      p0: data.p,
      p1: data.t,
      reverse: data.r,
      chunks: data.c,
      random: data.n,
      seed: data.s,
      limit: data.l,
      limitAffectsType: data.d,
      customData: data.customData,
   }, options);
}
