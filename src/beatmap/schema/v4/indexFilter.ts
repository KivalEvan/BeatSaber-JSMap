import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type { IWrapIndexFilterAttribute } from '../../../types/beatmap/wrapper/indexFilter.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createIndexFilter } from '../../core/indexFilter.ts';

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
      });
   },
};
