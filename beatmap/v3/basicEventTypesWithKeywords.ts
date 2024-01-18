import { IBasicEventTypesForKeywords } from '../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import { IBasicEventTypesWithKeywords } from '../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import { IWrapEventTypesWithKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import { DeepPartial } from '../../types/utils.ts';
import { WrapEventTypesWithKeywords } from '../wrapper/eventTypesWithKeywords.ts';
import { BasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/** Basic event types with keywords beatmap v3 class object. */
export class BasicEventTypesWithKeywords extends WrapEventTypesWithKeywords<
   IBasicEventTypesWithKeywords,
   IBasicEventTypesForKeywords
> {
   static default: Required<IBasicEventTypesWithKeywords> = {
      d: [],
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapEventTypesWithKeywordsAttribute<IBasicEventTypesWithKeywords>
      >,
   );
   constructor(data: DeepPartial<IBasicEventTypesWithKeywords>);
   constructor(
      data:
         & DeepPartial<IBasicEventTypesWithKeywords>
         & DeepPartial<
            IWrapEventTypesWithKeywordsAttribute<IBasicEventTypesWithKeywords>
         >,
   );
   constructor(
      data:
         & DeepPartial<IBasicEventTypesWithKeywords>
         & DeepPartial<
            IWrapEventTypesWithKeywordsAttribute<IBasicEventTypesWithKeywords>
         > = {},
   ) {
      super();

      const temp = data.d ?? data.list ?? BasicEventTypesWithKeywords.default.d;
      this._list = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this._list[i] = new BasicEventTypesForKeywords(temp[i]!);
      }
   }

   static create(): BasicEventTypesWithKeywords;
   static create(
      data: DeepPartial<
         IWrapEventTypesWithKeywordsAttribute<IBasicEventTypesWithKeywords>
      >,
   ): BasicEventTypesWithKeywords;
   static create(
      data: DeepPartial<IBasicEventTypesWithKeywords>,
   ): BasicEventTypesWithKeywords;
   static create(
      data:
         & DeepPartial<IBasicEventTypesWithKeywords>
         & DeepPartial<
            IWrapEventTypesWithKeywordsAttribute<IBasicEventTypesWithKeywords>
         >,
   ): BasicEventTypesWithKeywords;
   static create(
      data:
         & DeepPartial<IBasicEventTypesWithKeywords>
         & DeepPartial<
            IWrapEventTypesWithKeywordsAttribute<IBasicEventTypesWithKeywords>
         > = {},
   ): BasicEventTypesWithKeywords {
      return new this(data);
   }

   toJSON(): Required<IBasicEventTypesWithKeywords> {
      const json: Required<IBasicEventTypesWithKeywords> = {
         d: new Array(this.list.length),
      };
      for (let i = 0; i < this.list.length; i++) {
         json.d[i] = this.list[i].toJSON();
      }

      return json;
   }

   get list(): BasicEventTypesForKeywords[] {
      return this._list as BasicEventTypesForKeywords[];
   }
   set list(value: BasicEventTypesForKeywords[]) {
      this._list = value;
   }

   addList(value: BasicEventTypesForKeywords) {
      this.list.push(value);
      return this;
   }
}
