import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type { IWrapIndexFilterAttribute } from '../../../types/beatmap/wrapper/indexFilter.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Index Filter`.
 */
export const indexFilter: ISchemaContainer<IWrapIndexFilterAttribute, IIndexFilter> = {
   serialize(data) {
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
   },
   deserialize(data) {
      return {
         type: data.f ?? 1,
         p0: data.p ?? 0,
         p1: data.t ?? 0,
         reverse: data.r ?? 0,
         chunks: data.c ?? 0,
         random: data.n ?? 0,
         seed: data.s ?? 0,
         limit: data.l ?? 0,
         limitAffectsType: data.d ?? 0,
         customData: data.customData ?? {},
      };
   },
};
