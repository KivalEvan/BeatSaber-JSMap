import type { SliderMidAnchorMode } from '../shared/constants.ts';
import type { IWrapBaseSlider } from './baseSlider.ts';
import type { ICustomDataSlider } from './custom/slider.ts';

/**
 * Wrapper attribute for beatmap arc.
 */
export interface IWrapArc extends IWrapBaseSlider {
   /**
    * Head control point length multiplier of arc.
    *
    * Offset curve point from origin to the head direction of arc.
    *
    * **Type:** `f32`
    */
   lengthMultiplier: number;
   /**
    * Tail control point length multiplier of arc.
    *
    * Offset curve point to origin from the tail direction of arc.
    *
    * **Type:** `f32`
    */
   tailLengthMultiplier: number;
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
    * **WARNING:** Dot-directional is not recommended, assumes down-directional.
    *
    * **Type:** `i32`
    */
   tailDirection: number;
   /**
    * Mid anchor mode of arc.
    * ```ts
    * 0 -> Straight
    * 1 -> Clockwise
    * 2 -> Counter-Clockwise
    * ```
    *
    * **NOTE:** The visual will only be applied under specific condition.
    *
    * **Type:** {@linkcode SliderMidAnchorMode}
    */
   midAnchor: SliderMidAnchorMode;
   customData: ICustomDataSlider;
}
