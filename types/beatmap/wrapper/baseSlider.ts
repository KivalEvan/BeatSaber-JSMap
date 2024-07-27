import type { Vector2 } from '../../vector.ts';
import type { GetPositionFn, MirrorFn } from '../shared/functions.ts';
import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';

/**
 * Wrapper attribute for beatmap base slider.
 */
export interface IWrapBaseSliderAttribute extends IWrapBaseNoteAttribute {
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

/**
 * Wrapper for beatmap base slider.
 */
export interface IWrapBaseSlider extends IWrapBaseNote, IWrapBaseSliderAttribute {
   setDirection(value: number): this;
   setTailTime(value: number): this;
   setTailPosX(value: number): this;
   setTailPosY(value: number): this;
   setTailLaneRotation(value: number): this;

   mirror(flipColor?: boolean, fn?: MirrorFn<this>): this;
   getTailPosition(fn?: GetPositionFn<this>): Vector2;
}
