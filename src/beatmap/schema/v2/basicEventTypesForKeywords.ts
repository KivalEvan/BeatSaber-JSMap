import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpecialEventsKeywordFiltersKeywords } from '../../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapBasicEventTypesForKeywordsAttribute } from '../../../types/beatmap/wrapper/basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v2 `Basic Event Types For Keywords`.
 */
export const basicEventTypesForKeywords: ISchemaContainer<
   IWrapBasicEventTypesForKeywordsAttribute,
   ISpecialEventsKeywordFiltersKeywords
> = {
   serialize(data) {
      return {
         _keyword: data.keyword,
         _specialEvents: data.events,
      };
   },
   deserialize(data) {
      return {
         keyword: data._keyword ?? '',
         events: data._specialEvents ?? [],
         customData: {},
      };
   },
};
