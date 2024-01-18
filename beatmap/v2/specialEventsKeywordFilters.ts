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

      const temp = data._keywords ??
         data.list ??
         SpecialEventsKeywordFilters.default._keywords;
      this._list = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this._list[i] = new SpecialEventsKeywordFiltersKeywords(temp[i]!);
      }
   }

   static create(): SpecialEventsKeywordFilters;
   static create(
      data: DeepPartial<IWrapEventTypesWithKeywordsAttribute>,
   ): SpecialEventsKeywordFilters;
   static create(
      data: DeepPartial<ISpecialEventsKeywordFilters>,
   ): SpecialEventsKeywordFilters;
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

   toJSON(): Required<ISpecialEventsKeywordFilters> {
      const json: Required<ISpecialEventsKeywordFilters> = {
         _keywords: new Array(this.list.length),
      };
      for (let i = 0; i < this.list.length; i++) {
         json._keywords[i] = this.list[i].toJSON();
      }

      return json;
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
