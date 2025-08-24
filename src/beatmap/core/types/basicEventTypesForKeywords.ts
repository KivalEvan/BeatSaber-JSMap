import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap basic event types for keywords.
 */
export interface IWrapBasicEventTypesForKeywords extends IWrapBaseItem {
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
