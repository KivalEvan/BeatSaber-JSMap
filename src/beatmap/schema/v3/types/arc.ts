import type { SliderMidAnchorMode } from '../../shared/types/constants.ts';
import type { IBaseSlider } from './baseSlider.ts';
import type { ICustomDataSlider } from './custom/slider.ts';

/**
 * Schema for v3 `Arc`.
 */
export interface IArc extends IBaseSlider {
   /**
    * Head control point length multiplier of arc.
    *
    * Offset curve point from origin to the head direction of arc.
    *
    * **Type:** `f32`
    */
   mu?: number;
   /**
    * Tail control point length multiplier of arc.
    *
    * Offset curve point to origin from the tail direction of arc.
    *
    * **Type:** `f32`
    */
   tmu?: number;
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
   tc?: number;
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
   m?: SliderMidAnchorMode;
   customData?: ICustomDataSlider;
}
