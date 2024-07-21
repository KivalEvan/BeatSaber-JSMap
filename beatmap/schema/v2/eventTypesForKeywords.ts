import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpecialEventsKeywordFiltersKeywords } from '../../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapBasicEventTypesForKeywordsAttribute } from '../../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';

export const eventTypesForKeywords: ISchemaContainer<
   IWrapBasicEventTypesForKeywordsAttribute,
   ISpecialEventsKeywordFiltersKeywords
> = {
   serialize(data: IWrapBasicEventTypesForKeywordsAttribute): ISpecialEventsKeywordFiltersKeywords {
      return {
         _keyword: data.keyword,
         _specialEvents: data.events,
      };
   },
   deserialize(
      data: DeepPartial<ISpecialEventsKeywordFiltersKeywords> = {},
   ): DeepPartial<IWrapBasicEventTypesForKeywordsAttribute> {
      return {
         keyword: data._keyword,
         events: data._specialEvents,
      };
   },
};
