import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEventTypesWithKeywords } from '../../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import type { IWrapEventTypesWithKeywordsAttribute } from '../../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { eventTypesForKeywords } from './eventTypesForKeywords.ts';

export const eventTypesWithKeywords: ISchemaContainer<
   IWrapEventTypesWithKeywordsAttribute,
   IBasicEventTypesWithKeywords
> = {
   defaultValue: {
      d: [],
   } as Required<IBasicEventTypesWithKeywords>,
   serialize(
      data: IWrapEventTypesWithKeywordsAttribute
   ): Required<IBasicEventTypesWithKeywords> {
      return {
         d: data.list.map(eventTypesForKeywords.serialize),
      };
   },
   deserialize(
      data: DeepPartial<IBasicEventTypesWithKeywords> = {}
   ): DeepPartial<IWrapEventTypesWithKeywordsAttribute> {
      return {
         list: (data.d ?? this.defaultValue.d).map(
            eventTypesForKeywords.deserialize
         ),
      };
   },
   isValid(data: IWrapEventTypesWithKeywordsAttribute): boolean {
      return data.list.every(eventTypesForKeywords.isValid);
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
