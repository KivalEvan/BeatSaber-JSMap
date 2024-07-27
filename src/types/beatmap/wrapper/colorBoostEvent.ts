import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap color boost event.
 */
export interface IWrapColorBoostEventAttribute extends IWrapBaseObjectAttribute {
   /**
    * Toggle of boost event.
    *
    * **Type:** `bool`
    */
   toggle: boolean;
}

/**
 * Wrapper for beatmap color boost event.
 */
export interface IWrapColorBoostEvent extends IWrapBaseObject, IWrapColorBoostEventAttribute {
   setToggle(value: boolean): this;
}
