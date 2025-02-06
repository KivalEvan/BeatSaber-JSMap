import type {
   IWrapBasicEventTypesForKeywords,
   IWrapBasicEventTypesForKeywordsAttribute,
} from '../../types/beatmap/wrapper/basicEventTypesForKeywords.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseItem } from './abstract/baseItem.ts';

export function createBasicEventTypesForKeywords(
   data: DeepPartial<IWrapBasicEventTypesForKeywordsAttribute> = {},
): IWrapBasicEventTypesForKeywordsAttribute {
   return {
      keyword: data.keyword ?? '',
      events: data.events ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap basic event types for keywords.
 */
export class BasicEventTypesForKeywords extends BaseItem
   implements IWrapBasicEventTypesForKeywords {
   static defaultValue: IWrapBasicEventTypesForKeywordsAttribute =
      createBasicEventTypesForKeywords();

   static createOne(
      data: Partial<IWrapBasicEventTypesForKeywordsAttribute> = {},
   ): BasicEventTypesForKeywords {
      return new this(data);
   }
   static create(
      ...data: Partial<IWrapBasicEventTypesForKeywordsAttribute>[]
   ): BasicEventTypesForKeywords[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartialIgnore<IWrapBasicEventTypesForKeywordsAttribute, 'customData'> = {},
   ) {
      super();
      this.keyword = data.keyword ?? BasicEventTypesForKeywords.defaultValue.keyword;
      this.events = (data.events ?? BasicEventTypesForKeywords.defaultValue.events)
         .map((e) => e)
         .filter((e) => e) as number[];
      this.customData = deepCopy(
         data.customData ?? BasicEventTypesForKeywords.defaultValue.customData,
      );
   }

   keyword: IWrapBasicEventTypesForKeywords['keyword'];
   events: IWrapBasicEventTypesForKeywords['events'];

   setKeyword(value: this['keyword']): this {
      this.keyword = value;
      return this;
   }
   setEvents(value: this['events']): this {
      this.events = value;
      return this;
   }

   addEvent(value: number): this {
      this.events.push(value);
      return this;
   }
   removeEvent(value: number): this {
      const index = this.events.indexOf(value, 0);
      if (index > -1) {
         this.events.splice(index, 1);
      }
      return this;
   }
}
