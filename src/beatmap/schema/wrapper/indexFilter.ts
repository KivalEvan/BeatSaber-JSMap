import type { IWrapIndexFilter } from './types/indexFilter.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createIndexFilter(
   data: DeepPartial<IWrapIndexFilter> = {},
   options?: DeserializationOptions,
): IWrapIndexFilter {
   return {
      type: data.type ?? 1,
      p0: data.p0 ?? 0,
      p1: data.p1 ?? 0,
      reverse: data.reverse ?? 0,
      chunks: data.chunks ?? 0,
      random: data.random ?? 0,
      seed: data.seed ?? 0,
      limit: data.limit ?? 0,
      limitAffectsType: data.limitAffectsType ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}
