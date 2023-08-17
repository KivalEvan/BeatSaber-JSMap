import { ISpecialEventsKeywordFiltersKeywords } from '../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import { IWrapEventTypesForKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import { DeepPartial } from '../../types/utils.ts';
import { WrapEventTypesForKeywords } from '../wrapper/eventTypesForKeywords.ts';

/**
 * Special event types for keywords beatmap v2 class object.
 *
 * Used in special event types with keywords.
 */
export class SpecialEventsKeywordFiltersKeywords
   extends WrapEventTypesForKeywords<ISpecialEventsKeywordFiltersKeywords> {
   static default: Required<ISpecialEventsKeywordFiltersKeywords> = {
      _keyword: '',
      _specialEvents: [],
   };

   constructor();
   constructor(data: DeepPartial<IWrapEventTypesForKeywordsAttribute>);
   constructor(data: DeepPartial<ISpecialEventsKeywordFiltersKeywords>);
   constructor(
      data:
         & DeepPartial<ISpecialEventsKeywordFiltersKeywords>
         & DeepPartial<IWrapEventTypesForKeywordsAttribute>,
   );
   constructor(
      data:
         & DeepPartial<ISpecialEventsKeywordFiltersKeywords>
         & DeepPartial<IWrapEventTypesForKeywordsAttribute> = {},
   ) {
      super();

      this._keyword = data.keyword ?? data._keyword ??
         SpecialEventsKeywordFiltersKeywords.default._keyword;
      this._events = (
         data.events ??
            data._specialEvents ??
            SpecialEventsKeywordFiltersKeywords.default._specialEvents
      ).filter((n) => typeof n === 'number') as number[];
   }

   static create(): SpecialEventsKeywordFiltersKeywords[];
   static create(
      ...data: Partial<IWrapEventTypesForKeywordsAttribute>[]
   ): SpecialEventsKeywordFiltersKeywords[];
   static create(
      ...data: Partial<ISpecialEventsKeywordFiltersKeywords>[]
   ): SpecialEventsKeywordFiltersKeywords[];
   static create(
      ...data: (
         & Partial<ISpecialEventsKeywordFiltersKeywords>
         & Partial<IWrapEventTypesForKeywordsAttribute>
      )[]
   ): SpecialEventsKeywordFiltersKeywords[];
   static create(
      ...data: (
         & Partial<ISpecialEventsKeywordFiltersKeywords>
         & Partial<IWrapEventTypesForKeywordsAttribute>
      )[]
   ): SpecialEventsKeywordFiltersKeywords[] {
      const result: SpecialEventsKeywordFiltersKeywords[] = [];
      data.forEach((obj) => result.push(new this(obj)));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): ISpecialEventsKeywordFiltersKeywords {
      return {
         _keyword: this.keyword,
         _specialEvents: this.events,
      };
   }
}
