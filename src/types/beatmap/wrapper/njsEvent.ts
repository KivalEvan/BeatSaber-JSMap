import type { EaseType } from '../shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap NJS event.
 */
export interface IWrapNJSEventAttribute extends IWrapBaseObjectAttribute {
   /**
    * Modifier value.
    *
    * **Type:** `f32`
    */
   value: number;
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   previous: 0 | 1;
   /**
    * Easing value.
    *
    * **Type:** {@linkcode EaseType}
    */
   easing: EaseType;
}

/**
 * Wrapper for beatmap NJS event.
 */
export interface IWrapNJSEvent extends IWrapBaseObject, IWrapNJSEventAttribute {
   setValue(value: number): this;
   setPrevious(value: 0 | 1): this;
   setEasing(value: EaseType): this;
}
