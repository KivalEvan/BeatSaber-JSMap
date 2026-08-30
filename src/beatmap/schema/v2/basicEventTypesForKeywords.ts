import type { ISpecialEventsKeywordFiltersKeywords } from '../../schema/v2/types/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../wrapper/types/basicEventTypesForKeywords.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { createBasicEventTypesForKeywords } from '../wrapper/basicEventTypesForKeywords.ts';

/** Serialize beatmap v2 `Basic Event Types For Keywords` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEventTypesForKeywords(
   data: IWrapBasicEventTypesForKeywords,
): ISpecialEventsKeywordFiltersKeywords {
   return {
      _keyword: data.keyword,
      _specialEvents: data.events,
   };
}

/** Deserialize schema object into beatmap v2 `Basic Event Types For Keywords` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEventTypesForKeywords(
   data: ISpecialEventsKeywordFiltersKeywords,
   options?: DeserializationOptions,
): IWrapBasicEventTypesForKeywords {
   return createBasicEventTypesForKeywords({
      keyword: data._keyword,
      events: data._specialEvents,
   }, options);
}
