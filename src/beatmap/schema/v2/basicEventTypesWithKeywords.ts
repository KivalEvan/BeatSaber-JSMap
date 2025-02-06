import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpecialEventsKeywordFilters } from '../../../types/beatmap/v2/specialEventsKeywordFilters.ts';
import type { IWrapBasicEventTypesWithKeywordsAttribute } from '../../../types/beatmap/wrapper/mod.ts';
import { basicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v2 `Basic Event Types With Keywords`.
 */
export const basicEventTypesWithKeywords: ISchemaContainer<
   IWrapBasicEventTypesWithKeywordsAttribute,
   ISpecialEventsKeywordFilters
> = {
   serialize(data) {
      return {
         _keywords: data.list.map((x) => {
            return basicEventTypesForKeywords.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return {
         list: data._keywords?.map((x) => {
            return basicEventTypesForKeywords.deserialize(x);
         }) ?? [],
      };
   },
};
