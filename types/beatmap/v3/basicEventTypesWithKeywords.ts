import type { IBasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/**
 * Schema for v3 `Basic Event Types With Keywords`.
 */
export interface IBasicEventTypesWithKeywords {
   /** Data list of basic event types with keywords. */
   d?: IBasicEventTypesForKeywords[];
}
