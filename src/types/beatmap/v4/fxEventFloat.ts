import type { EaseType } from '../shared/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `FX Event Float`.
 */
export interface IFxEventFloat extends IItem {
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Ease type of FX event.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
   /**
    * Value of FX event.
    *
    * **Type:** `f32`
    */
   v?: number;
}
