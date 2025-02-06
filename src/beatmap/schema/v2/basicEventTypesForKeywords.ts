import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpecialEventsKeywordFiltersKeywords } from '../../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../../../types/beatmap/wrapper/basicEventTypesForKeywords.ts';
import { createBasicEventTypesForKeywords } from '../../core/basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v2 `Basic Event Types For Keywords`.
 */
export const basicEventTypesForKeywords: ISchemaContainer<
   IWrapBasicEventTypesForKeywords,
   ISpecialEventsKeywordFiltersKeywords
> = {
   serialize(data) {
      return {
         _keyword: data.keyword,
         _specialEvents: data.events,
      };
   },
   deserialize(data) {
      return createBasicEventTypesForKeywords({
         keyword: data._keyword,
         events: data._specialEvents,
      });
   },
};
