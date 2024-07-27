import type { IItem } from './item.ts';

/**
 * Schema for v4 `Color Boost Event`.
 */
export interface IColorBoostEvent extends IItem {
   /**
    * **Type:** `i32`
    */
   b?: 0 | 1;
}
