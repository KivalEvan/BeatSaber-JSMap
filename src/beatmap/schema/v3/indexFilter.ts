import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IIndexFilter } from './types/indexFilter.ts';
import type { IWrapIndexFilter } from '../wrapper/types/indexFilter.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createIndexFilter } from '../wrapper/indexFilter.ts';

/**
 * Schema serialization for v3 `Index Filter`.
 */
export const indexFilter: ISchemaContainer<IWrapIndexFilter, IIndexFilter> = {
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
