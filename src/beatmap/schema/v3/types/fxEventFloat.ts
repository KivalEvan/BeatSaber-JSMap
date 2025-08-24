import type { EaseType } from '../../shared/types/constants.ts';
import type { ICustomDataBase } from '../../shared/types/custom/customData.ts';

/**
 * Schema for v3 `FX Event Float`.
 */
export interface IFxEventFloat {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   b?: number;
   /**
    * Ease type of FX event.
    *
    * **Type:** {@link EaseType}
    */
   i?: EaseType;
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Value of FX event.
    *
    * **Type:** `f32`
    */
   v?: number;
   customData?: ICustomDataBase;
}
