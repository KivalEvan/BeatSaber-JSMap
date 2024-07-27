import type { ICustomDataBase } from '../shared/custom/customData.ts';

/**
 * Schema for v3 `FX Event Int`.
 */
export interface IFxEventInt {
   /**
    * Relative beat time `<float>` to event box group.
    *
    * **Type:** `f32`
    */
   b?: number;
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Value of FX event.
    *
    * **Type:** `i32`
    */
   v?: number;
   customData?: ICustomDataBase;
}
