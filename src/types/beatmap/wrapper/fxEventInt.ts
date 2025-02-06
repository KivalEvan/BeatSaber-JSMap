import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap FX int event.
 */
export interface IWrapFxEventInt extends IWrapBaseObject {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   time: number;
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   previous: 0 | 1;
   /**
    * Value of FX event.
    *
    * **Type:** `i32`
    */
   value: number;
}
