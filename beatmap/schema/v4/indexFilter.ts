import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type { IWrapIndexFilterAttribute } from '../../../types/beatmap/wrapper/indexFilter.ts';
import { deepCopy } from '../../../utils/misc.ts';
export const indexFilter: ISchemaContainer<
   IWrapIndexFilterAttribute,
   IIndexFilter
> = {
   defaultValue: {
      f: 1,
      p: 0,
      t: 0,
      r: 0,
      c: 0,
      n: 0,
      s: 0,
      l: 0,
      d: 0,
      customData: {},
   } as Required<IIndexFilter>,
   serialize(data: IWrapIndexFilterAttribute): IIndexFilter {
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
   deserialize(
      data: Partial<IIndexFilter> = {},
   ): Partial<IWrapIndexFilterAttribute> {
      return {
         type: data.f ?? this.defaultValue.f,
         p0: data.p ?? this.defaultValue.p,
         p1: data.t ?? this.defaultValue.t,
         reverse: data.r ?? this.defaultValue.r,
         chunks: data.c ?? this.defaultValue.c,
         random: data.n ?? this.defaultValue.n,
         seed: data.s ?? this.defaultValue.s,
         limit: data.l ?? this.defaultValue.l,
         limitAffectsType: data.d ?? this.defaultValue.d,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapIndexFilterAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapIndexFilterAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapIndexFilterAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapIndexFilterAttribute): boolean {
      return false;
   },
};
