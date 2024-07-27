import type { ICustomDataSlider } from '../v3/custom/slider.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Chain`.
 */
export interface IChain extends IItem {
   /**
    * Position X of chain.
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
    * Position Y of chain.
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
   /**
    * Slice count or element in chain.
    *
    * **NOTE:** Must be more than `0`, the head counts as `1`.
    *
    * **Type:** `i32`
    */
   c?: number;
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
