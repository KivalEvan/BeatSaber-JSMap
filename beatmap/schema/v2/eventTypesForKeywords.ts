import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpecialEventsKeywordFiltersKeywords } from '../../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import type { IWrapEventTypesForKeywordsAttribute } from '../../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';

export const eventTypesForKeywords: ISchemaContainer<
   IWrapEventTypesForKeywordsAttribute,
   ISpecialEventsKeywordFiltersKeywords
> = {
   defaultValue: {
      _keyword: '',
      _specialEvents: [],
   } as Required<ISpecialEventsKeywordFiltersKeywords>,
   serialize(
      data: IWrapEventTypesForKeywordsAttribute,
   ): ISpecialEventsKeywordFiltersKeywords {
      return {
         _keyword: data.keyword,
         _specialEvents: data.events,
      };
   },
   deserialize(
      data: DeepPartial<ISpecialEventsKeywordFiltersKeywords> = {},
   ): DeepPartial<IWrapEventTypesForKeywordsAttribute> {
      return {
         keyword: data._keyword ?? this.defaultValue._keyword,
         events: data._specialEvents ?? this.defaultValue._specialEvents,
      };
   },
   isValid(_: IWrapEventTypesForKeywordsAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapEventTypesForKeywordsAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapEventTypesForKeywordsAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapEventTypesForKeywordsAttribute): boolean {
      return false;
   },
};
