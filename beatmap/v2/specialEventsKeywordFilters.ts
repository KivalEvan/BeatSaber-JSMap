import { ISpecialEventsKeywordFilters } from '../../types/beatmap/v2/specialEventsKeywordFilters.ts';
import { DeepPartial } from '../../types/utils.ts';
import { SpecialEventsKeywordFiltersKeywords } from './specialEventsKeywordFiltersKeywords.ts';
import { WrapEventTypesWithKeywords } from '../wrapper/eventTypesWithKeywords.ts';
import { ISpecialEventsKeywordFiltersKeywords } from '../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import { IWrapEventTypesWithKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';

/** Special event types with keywords beatmap v2 class object. */
export class SpecialEventsKeywordFilters extends WrapEventTypesWithKeywords<
   ISpecialEventsKeywordFilters,
   ISpecialEventsKeywordFiltersKeywords
> {
   static default: Required<ISpecialEventsKeywordFilters> = {
      _keywords: [],
   };

   constructor();
   constructor(data: DeepPartial<IWrapEventTypesWithKeywordsAttribute>);
   constructor(data: DeepPartial<ISpecialEventsKeywordFilters>);
   constructor(
      data:
         & DeepPartial<ISpecialEventsKeywordFilters>
         & DeepPartial<IWrapEventTypesWithKeywordsAttribute>,
   );
   constructor(
      data:
         & DeepPartial<ISpecialEventsKeywordFilters>
         & DeepPartial<IWrapEventTypesWithKeywordsAttribute> = {},
   ) {
      super();

      this._list = (data._keywords ?? data.list ?? SpecialEventsKeywordFilters.default._keywords)
         .map((d) => {
            if (d) return new SpecialEventsKeywordFiltersKeywords(d);
         })
         .filter((d) => d) as SpecialEventsKeywordFiltersKeywords[];
   }

   static create(): SpecialEventsKeywordFilters;
   static create(
      data: DeepPartial<IWrapEventTypesWithKeywordsAttribute>,
   ): SpecialEventsKeywordFilters;
   static create(data: DeepPartial<ISpecialEventsKeywordFilters>): SpecialEventsKeywordFilters;
   static create(
      data:
         & DeepPartial<ISpecialEventsKeywordFilters>
         & DeepPartial<IWrapEventTypesWithKeywordsAttribute>,
   ): SpecialEventsKeywordFilters;
   static create(
      data:
         & DeepPartial<ISpecialEventsKeywordFilters>
         & DeepPartial<IWrapEventTypesWithKeywordsAttribute> = {},
   ): SpecialEventsKeywordFilters {
      return new this(data);
   }

   toJSON(): ISpecialEventsKeywordFilters {
      return {
         _keywords: this.list.map((d) => d.toJSON()),
      };
   }

   get list(): SpecialEventsKeywordFiltersKeywords[] {
      return this._list as SpecialEventsKeywordFiltersKeywords[];
   }
   set list(value: SpecialEventsKeywordFiltersKeywords[]) {
      this._list = value;
   }

   addList(value: SpecialEventsKeywordFiltersKeywords) {
      this._list.push(value);
      return this;
   }
}
