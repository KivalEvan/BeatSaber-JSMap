import type { IWrapBasicEventTypesForKeywords } from './types/basicEventTypesForKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createBasicEventTypesForKeywords(
   data: DeepPartial<IWrapBasicEventTypesForKeywords> = {},
   options?: DeserializationOptions,
): IWrapBasicEventTypesForKeywords {
   return {
      keyword: data.keyword ?? '',
      events: data.events ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
