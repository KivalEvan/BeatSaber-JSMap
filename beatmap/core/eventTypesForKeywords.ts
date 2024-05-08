// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import type {
   IWrapEventTypesForKeywords,
   IWrapEventTypesForKeywordsAttribute,
} from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { BaseItem } from './abstract/baseItem.ts';

export class EventTypesForKeywords extends BaseItem implements IWrapEventTypesForKeywords {
   static schema: Record<
      number,
      ISchemaContainer<IWrapEventTypesForKeywordsAttribute>
   > = {};
   static defaultValue: IWrapEventTypesForKeywordsAttribute = {
      keyword: '',
      events: [],
      customData: {},
   };

   static create(
      ...data: Partial<IWrapEventTypesForKeywordsAttribute>[]
   ): EventTypesForKeywords[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapEventTypesForKeywordsAttribute> = {}) {
      super();
      this.keyword = data.keyword ?? EventTypesForKeywords.defaultValue.keyword;
      this.events = (data.events ?? EventTypesForKeywords.defaultValue.events)
         .map((e) => e)
         .filter((e) => e) as number[];
      this.customData = deepCopy(
         data.customData ?? EventTypesForKeywords.defaultValue.customData,
      );
   }
   static fromJSON(
      data: Record<string, any>,
      version: number,
   ): EventTypesForKeywords {
      return new this(EventTypesForKeywords.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (EventTypesForKeywords.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapEventTypesForKeywordsAttribute {
      return {
         keyword: this.keyword,
         events: this.events.map((e) => e),
         customData: deepCopy(this.customData),
      };
   }
   isValid(): boolean {
      return true;
   }

   keyword: IWrapEventTypesForKeywords['keyword'] = '';
   events!: IWrapEventTypesForKeywords['events'];

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
