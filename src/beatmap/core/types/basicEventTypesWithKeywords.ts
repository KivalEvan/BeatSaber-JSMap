import type { IWrapBasicEventTypesForKeywords } from './basicEventTypesForKeywords.ts';

/**
 * Wrapper attribute for beatmap basic event types with keywords.
 */
export interface IWrapBasicEventTypesWithKeywords {
   /** Data list of event types with keywords. */
   list: IWrapBasicEventTypesForKeywords[];
}
