import type { ISpecialEventsKeywordFiltersKeywords } from '../../schema/v2/types/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../wrapper/types/basicEventTypesForKeywords.ts';
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
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEventTypesForKeywords(
   data: ISpecialEventsKeywordFiltersKeywords,
): IWrapBasicEventTypesForKeywords {
   return createBasicEventTypesForKeywords({
      keyword: data._keyword,
      events: data._specialEvents,
   });
}
