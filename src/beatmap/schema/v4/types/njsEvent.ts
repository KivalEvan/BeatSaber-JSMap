import type { EaseType } from '../../shared/types/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Color Boost Event`.
 */
export interface INJSEvent extends IItem {
   /**
    * Modifier value.
    *
    * **Type:** `f32`
    */
   d?: number;
   /**
    * Use previous event value in FX event.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Easing value.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
}
