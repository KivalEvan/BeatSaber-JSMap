import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEventTypesForKeywords } from '../../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../../../types/beatmap/wrapper/basicEventTypesForKeywords.ts';
import { createBasicEventTypesForKeywords } from '../../core/basicEventTypesForKeywords.ts';

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
