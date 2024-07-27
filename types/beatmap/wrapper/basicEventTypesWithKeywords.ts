import type {
   IWrapBasicEventTypesForKeywords,
   IWrapBasicEventTypesForKeywordsAttribute,
} from './basicEventTypesForKeywords.ts';

/**
 * Wrapper attribute for beatmap basic event types with keywords.
 */
export interface IWrapBasicEventTypesWithKeywordsAttribute {
   /** Data list of event types with keywords. */
   list: IWrapBasicEventTypesForKeywordsAttribute[];
}

/**
 * Wrapper for beatmap basic event types with keywords.
 */
export interface IWrapBasicEventTypesWithKeywords
   extends IWrapBasicEventTypesWithKeywordsAttribute {
   list: IWrapBasicEventTypesForKeywords[];
}
