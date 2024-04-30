import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpecialEventsKeywordFilters } from '../../../types/beatmap/v2/specialEventsKeywordFilters.ts';
import type { IWrapEventTypesWithKeywordsAttribute } from '../../../types/beatmap/wrapper/mod.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { eventTypesForKeywords } from './eventTypesForKeywords.ts';

export const eventTypesWithKeywords: ISchemaContainer<
   IWrapEventTypesWithKeywordsAttribute,
   ISpecialEventsKeywordFilters
> = {
   defaultValue: {
      _keywords: [],
   } as Required<ISpecialEventsKeywordFilters>,
   serialize(
      data: IWrapEventTypesWithKeywordsAttribute,
   ): ISpecialEventsKeywordFilters {
      return {
         _keywords: data.list.map(eventTypesForKeywords.serialize),
      };
   },
   deserialize(
      data: DeepPartial<ISpecialEventsKeywordFilters> = {},
   ): DeepPartial<IWrapEventTypesWithKeywordsAttribute> {
      return {
         list: (data._keywords ?? this.defaultValue._keywords).map(
            eventTypesForKeywords.deserialize,
         ),
      };
   },
   isValid(_: IWrapEventTypesWithKeywordsAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapEventTypesWithKeywordsAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapEventTypesWithKeywordsAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapEventTypesWithKeywordsAttribute): boolean {
      return false;
   },
};
