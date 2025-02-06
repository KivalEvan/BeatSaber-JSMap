import type { IWrapBaseNote } from './baseNote.ts';

/**
 * Wrapper attribute for beatmap base slider.
 */
export interface IWrapBaseSlider extends IWrapBaseNote {
   /**
    * Tail beat time of base slider.
    *
    * **Type:** `f32`
    */
   tailTime: number;
   /**
    * Tail position X of base slider.
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
   tailPosX: number;
   /**
    * Tail position Y of base slider.
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
   tailPosY: number;
   /**
    * Tail lane rotation of base slider.
    *
    * **Type:** `f32`
    */
   tailLaneRotation: number;
}
