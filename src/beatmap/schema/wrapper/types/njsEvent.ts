import type { EaseType } from '../../../schema/shared/types/constants.ts';
import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap NJS event.
 */
export interface IWrapNJSEvent extends IWrapBaseObject {
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
