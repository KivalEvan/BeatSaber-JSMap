import type {
   IWrapBasicEventTypesForKeywords,
} from '../../types/beatmap/wrapper/basicEventTypesForKeywords.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseItem } from './abstract/baseItem.ts';

export function createBasicEventTypesForKeywords(
   data: DeepPartial<IWrapBasicEventTypesForKeywords> = {},
): IWrapBasicEventTypesForKeywords {
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
   static defaultValue: IWrapBasicEventTypesForKeywords = createBasicEventTypesForKeywords();

   static createOne(
      data: DeepPartial<IWrapBasicEventTypesForKeywords> = {},
   ): BasicEventTypesForKeywords {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapBasicEventTypesForKeywords>[]
   ): BasicEventTypesForKeywords[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartial<IWrapBasicEventTypesForKeywords> = {},
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
