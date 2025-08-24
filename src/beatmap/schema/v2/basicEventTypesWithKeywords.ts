import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ISpecialEventsKeywordFilters } from '../../schema/v2/types/specialEventsKeywordFilters.ts';
import type { IWrapBasicEventTypesWithKeywords } from '../../core/types/basicEventTypesWithKeywords.ts';
import { basicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v2 `Basic Event Types With Keywords`.
 */
export const basicEventTypesWithKeywords: ISchemaContainer<
   IWrapBasicEventTypesWithKeywords,
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
