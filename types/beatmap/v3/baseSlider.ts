import type { NoteColor } from '../shared/constants.ts';
import type { IGridObject } from './gridObject.ts';

/**
 * Base schema for v3 `Slider`.
 */
export interface IBaseSlider extends IGridObject {
   /**
    * Color type of base arc.
    * ```ts
    * 0 -> Red
    * 1 -> Blue
    * ```
    *
    * **Type:** `i32`
    */
   c?: NoteColor;
   /**
    * Head cut direction of base arc.
    * ```ts
    * 4 | 0 | 5
    * 2 | 8 | 3
    * 6 | 1 | 7
    * ```
    *
    * Grid represents cut direction from center.
    *
    * **WARNING:** Dot-directional is not recommended, assumes down-directional.
    *
    * **Type:** `i32`
    */
   d?: number;
   /**
    * Tail beat time of base arc.
    *
    * **Type:** `f32`
    */
   tb?: number;
   /**
    * Tail position X of base arc.
    * ```ts
    * 0 -> Outer Left
    * 1 -> Middle Left
    * 2 -> Middle Right
    * 3 -> Outer Right
    * ```
    *
    * **RANGE:** `none`
    *
    * **Type:** `i32`
    */
   tx?: number;
   /**
    * Tail position Y of base arc.
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
   ty?: number;
}
