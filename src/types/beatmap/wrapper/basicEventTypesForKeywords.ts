import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap basic event types for keywords.
 */
export interface IWrapBasicEventTypesForKeywordsAttribute extends IWrapBaseItemAttribute {
   /**
    * Keyword of event types for keywords.
    *
    * **Type:** `string`
    */
   keyword: string;
   /** Event type of event types for keywords.
    *
    * **Type:** `i32[]`
    */
   events: number[];
}

/**
 * Wrapper for beatmap basic event types for keywords.
 */
export interface IWrapBasicEventTypesForKeywords
   extends IWrapBaseItem, IWrapBasicEventTypesForKeywordsAttribute {
   setKeyword(value: IWrapBasicEventTypesForKeywords['keyword']): this;
   setEvents(value: IWrapBasicEventTypesForKeywords['events']): this;

   addEvent(value: number): this;
   removeEvent(value: number): this;
}
