import type { NoteColor, SliderMidAnchorMode } from '../../shared/types/constants.ts';
import type { ICustomDataBase } from '../../shared/types/custom/customData.ts';

/**
 * Schema for v2 `Arc`.
 */
export interface IArc {
   /**
    * Color type of base arc.
    * ```ts
    * 0 -> Red
    * 1 -> Blue
    * ```
    *
    * **Type:** {@linkcode NoteColor}
    */
   _colorType?: NoteColor;
   /**
    * Head time of arc.
    *
    * **Type:** `f32`
    */
   _headTime?: number;
   /**
    * Head line index of arc.
    *
    * **Type:** `i32`
    */
   _headLineIndex?: number;
   /**
    * Head line layer of arc.
    *
    * **Type:** `i32`
    */
   _headLineLayer?: number;
   /**
    * Head control point length multiplier of arc.
    *
    * **Type:** `f32`
    */
   _headControlPointLengthMultiplier?: number;
   /**
    * Head cut direction of arc.
    * ```ts
    * 4 | 0 | 5
    * 2 | 8 | 3
    * 6 | 1 | 7
    * ```
    *
    * Grid represents cut direction from center.
    *
    * **Type:** `i32`
    */
   _headCutDirection?: number;
   /**
    * Tail time of arc.
    *
    * **Type:** `f32`
    */
   _tailTime?: number;
   /**
    * Tail line index of arc.
    *
    * **Type:** `i32`
    */
   _tailLineIndex?: number;
   /**
    * Tail line layer of arc.
    *
    * **Type:** `i32`
    */
   _tailLineLayer?: number;
   /**
    * Tail control point length multiplier of arc.
    *
    * **Type:** `f32`
    */
   _tailControlPointLengthMultiplier?: number;
   /**
    * Tail cut direction of arc.
    * ```ts
    * 4 | 0 | 5
    * 2 | 8 | 3
    * 6 | 1 | 7
    * ```
    *
    * Grid represents cut direction from center.
    *
    * **Type:** `i32`
    */
   _tailCutDirection?: number;
   /**
    * Mid anchor mode of arc.
    * ```ts
    * 0 -> Straight
    * 1 -> Clockwise
    * 2 -> Counter-Clockwise
    * ```
    *
    * **Type:** {@linkcode SliderMidAnchorMode}
    */
   _sliderMidAnchorMode?: SliderMidAnchorMode;
   _customData?: ICustomDataBase;
}
