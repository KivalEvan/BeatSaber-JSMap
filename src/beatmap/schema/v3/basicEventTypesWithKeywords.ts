import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEventTypesWithKeywords } from '../../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import type { IWrapBasicEventTypesWithKeywordsAttribute } from '../../../types/beatmap/wrapper/basicEventTypesWithKeywords.ts';
import { basicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v3 `Basic Event Types With Keywords`.
 */
export const basicEventTypesWithKeywords: ISchemaContainer<
   IWrapBasicEventTypesWithKeywordsAttribute,
   IBasicEventTypesWithKeywords
> = {
   serialize(data) {
      return {
         d: data.list.map((x) => {
            return basicEventTypesForKeywords.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return {
         list: data.d?.map((x) => {
            return basicEventTypesForKeywords.deserialize(x);
         }) ?? [],
      };
   },
};
