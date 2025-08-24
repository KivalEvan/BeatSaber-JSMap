import type { IBaseSlider } from './baseSlider.ts';
import type { ICustomDataSlider } from './custom/slider.ts';

/**
 * Schema for v3 `Chain`.
 */
export interface IChain extends IBaseSlider {
   /**
    * Slice count or element in chain.
    *
    * **NOTE:** Must be more than `0`, the head counts as `1`.
    *
    * **Type:** `i32`
    */
   sc?: number;
   /**
    * Length multiplier of element in chain.
    * ```ts
    * 1 -> Normal length
    * 0.5 -> Half length
    * 0.25 -> Quarter length
    * ```
    *
    * **WARNING:** Value `0` will crash the game.
    *
    * **Type:** `f32`
    */
   s?: number;
   customData?: ICustomDataSlider;
}
