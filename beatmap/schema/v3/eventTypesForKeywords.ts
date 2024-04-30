import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEventTypesForKeywords } from '../../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import type { IWrapEventTypesForKeywordsAttribute } from '../../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import type { DeepPartial } from '../../../types/utils.ts';

export const eventTypesForKeywords: ISchemaContainer<
   IWrapEventTypesForKeywordsAttribute,
   IBasicEventTypesForKeywords
> = {
   defaultValue: {
      k: '',
      e: [],
   } as Required<IBasicEventTypesForKeywords>,
   serialize(
      data: IWrapEventTypesForKeywordsAttribute
   ): IBasicEventTypesForKeywords {
      return {
         k: data.keyword,
         e: data.events.map((e) => e),
      };
   },
   deserialize(
      data: DeepPartial<IBasicEventTypesForKeywords> = {}
   ): DeepPartial<IWrapEventTypesForKeywordsAttribute> {
      return {
         keyword: data.k ?? this.defaultValue.k,
         events: (data.e ?? this.defaultValue.e).map((e) => e),
      };
   },
   isValid(data: IWrapEventTypesForKeywordsAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapEventTypesForKeywordsAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapEventTypesForKeywordsAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapEventTypesForKeywordsAttribute): boolean {
      return false;
   },
};
