import type { EaseType } from '../../../beatmap/shared/constants.ts';
import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap FX float event.
 */
export interface IWrapFxEventFloat extends IWrapBaseObject {
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
