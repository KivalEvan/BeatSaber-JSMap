import type { EaseType } from '../../shared/types/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Light Translation Event`.
 */
export interface ILightTranslationEvent extends IItem {
   /**
    * Use previous event translation value in light translation.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Ease type of light translation.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
   /**
    * Translation value of light translation.
    *
    * **Type:** `i32`
    */
   t?: number;
}
