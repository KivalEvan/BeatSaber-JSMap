import type { SliderMidAnchorMode } from '../../shared/types/constants.ts';
import type { ICustomDataSlider } from '../../v3/types/custom/slider.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Arc`.
 */
export interface IArc extends IItem {
   /**
    * Head control point length multiplier of arc.
    *
    * Offset curve point from origin to the head direction of arc.
    *
    * **Type:** `f32`
    */
   m?: number;
   /**
    * Tail control point length multiplier of arc.
    *
    * Offset curve point to origin from the tail direction of arc.
    *
    * **Type:** `f32`
    */
   tm?: number;
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
   a?: SliderMidAnchorMode;
   customData?: ICustomDataSlider;
}
