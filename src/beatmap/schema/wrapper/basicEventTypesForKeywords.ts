import type { IWrapBasicEventTypesForKeywords } from './types/basicEventTypesForKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createBasicEventTypesForKeywords(
   data: DeepPartial<IWrapBasicEventTypesForKeywords> = {},
): IWrapBasicEventTypesForKeywords {
   return {
      keyword: data.keyword ?? '',
      events: data.events ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
