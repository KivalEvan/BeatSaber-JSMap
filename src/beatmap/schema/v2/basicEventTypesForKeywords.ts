import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ISpecialEventsKeywordFiltersKeywords } from '../../schema/v2/types/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../wrapper/types/basicEventTypesForKeywords.ts';
import { createBasicEventTypesForKeywords } from '../wrapper/basicEventTypesForKeywords.ts';

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
