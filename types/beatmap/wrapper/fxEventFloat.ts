import type { EaseType } from '../../../beatmap/shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap FX float event.
 */
export interface IWrapFxEventFloatAttribute extends IWrapBaseObjectAttribute {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   time: number;
   /**
    * Ease type of FX event.
    *
    * **Type:** {@linkcode EaseType}
    */
   easing: EaseType;
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   previous: 0 | 1;
   /**
    * Value of FX event.
    *
    * **Type:** `f32`
    */
   value: number;
}

/**
 * Wrapper for beatmap FX float event.
 */
export interface IWrapFxEventFloat extends IWrapBaseObject, IWrapFxEventFloatAttribute {
   setPrevious(value: 0 | 1): this;
   setEasing(value: EaseType): this;
   setValue(value: number): this;
}
