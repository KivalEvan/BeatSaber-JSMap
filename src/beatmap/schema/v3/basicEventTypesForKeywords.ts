import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IBasicEventTypesForKeywords } from './types/basicEventTypesForKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../wrapper/types/basicEventTypesForKeywords.ts';
import { createBasicEventTypesForKeywords } from '../wrapper/basicEventTypesForKeywords.ts';

/**
 * Schema serialization for v3 `Basic Event Types For Keywords`.
 */
export const basicEventTypesForKeywords: ISchemaContainer<
   IWrapBasicEventTypesForKeywords,
   IBasicEventTypesForKeywords
> = {
   serialize(data) {
      return {
         k: data.keyword,
         e: data.events.map((e) => e),
      };
   },
   deserialize(data) {
      return createBasicEventTypesForKeywords({
         keyword: data.k,
         events: data.e?.map((e) => e),
      });
   },
};
