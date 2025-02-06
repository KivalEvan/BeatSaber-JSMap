import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap color boost event.
 */
export interface IWrapColorBoostEvent extends IWrapBaseObject {
   /**
    * Toggle of boost event.
    *
    * **Type:** `bool`
    */
   toggle: boolean;
}
