import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEventTypesWithKeywords } from '../../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import type { IWrapBasicEventTypesWithKeywordsAttribute } from '../../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { eventTypesForKeywords } from './eventTypesForKeywords.ts';

export const eventTypesWithKeywords: ISchemaContainer<
   IWrapBasicEventTypesWithKeywordsAttribute,
   IBasicEventTypesWithKeywords
> = {
   serialize(
      data: IWrapBasicEventTypesWithKeywordsAttribute,
   ): Required<IBasicEventTypesWithKeywords> {
      return {
         d: data.list.map(eventTypesForKeywords.serialize),
      };
   },
   deserialize(
      data: DeepPartial<IBasicEventTypesWithKeywords> = {},
   ): DeepPartial<IWrapBasicEventTypesWithKeywordsAttribute> {
      return {
         list: data.d?.map(eventTypesForKeywords.deserialize),
      };
   },
};
