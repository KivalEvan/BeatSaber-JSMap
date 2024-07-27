import type { EaseType } from '../shared/constants.ts';
import type { ICustomDataBase } from '../shared/custom/customData.ts';

/**
 * Schema for v3 `Light Translation Event`.
 */
export interface ILightTranslationEvent {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   b?: number;
   /**
    * Ease type of light translation.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
   /**
    * Use previous event translation value in light translation.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Translation value of light translation.
    *
    * **Type:** `f32`
    */
   t?: number;
   customData?: ICustomDataBase;
}
