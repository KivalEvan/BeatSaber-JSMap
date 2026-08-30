import type { ISpecialEventsKeywordFilters } from '../../schema/v2/types/specialEventsKeywordFilters.ts';
import type { IWrapBasicEventTypesWithKeywords } from '../wrapper/types/basicEventTypesWithKeywords.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import {
   deserializeBasicEventTypesForKeywords,
   serializeBasicEventTypesForKeywords,
} from './basicEventTypesForKeywords.ts';

/** Serialize beatmap v2 `Basic Event Types With Keywords` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEventTypesWithKeywords(
   data: IWrapBasicEventTypesWithKeywords,
): ISpecialEventsKeywordFilters {
   return {
      _keywords: data.list.map((x) => {
         return serializeBasicEventTypesForKeywords(x);
      }),
   };
}

/** Deserialize schema object into beatmap v2 `Basic Event Types With Keywords` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEventTypesWithKeywords(
   data: ISpecialEventsKeywordFilters,
   options?: DeserializationOptions,
): IWrapBasicEventTypesWithKeywords {
   return {
      list: data._keywords?.map((x) => {
         return deserializeBasicEventTypesForKeywords(x, options);
      }) ?? [],
   };
}
