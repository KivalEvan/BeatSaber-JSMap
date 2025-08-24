import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IBasicEventTypesWithKeywords } from './types/basicEventTypesWithKeywords.ts';
import type { IWrapBasicEventTypesWithKeywords as IWrapBasicEventTypesWithKeywords } from '../wrapper/types/basicEventTypesWithKeywords.ts';
import { basicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v3 `Basic Event Types With Keywords`.
 */
export const basicEventTypesWithKeywords: ISchemaContainer<
   IWrapBasicEventTypesWithKeywords,
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
