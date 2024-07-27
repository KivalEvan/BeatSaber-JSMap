import type { IBaseObject } from './baseObject.ts';

/**
 * Schema for v3 `Grid Object`.
 */
export interface IGridObject extends IBaseObject {
   /**
    * Position X of base note.
    * ```ts
    * 0 -> Outer Left
    * 1 -> Middle Left
    * 2 -> Middle Right
    * 3 -> Outer Right
    * ```
    *
    * **RANGE:** `0-3`
    *
    * **Type:** `i32`
    */
   x?: number;
   /**
    * Position Y of base note.
    * ```ts
    * 0 -> Bottom row
    * 1 -> Middle row
    * 2 -> Top row
    * ```
    *
    * **RANGE:** `0-2`
    *
    * **Type:** `i32`
    */
   y?: number;
}
