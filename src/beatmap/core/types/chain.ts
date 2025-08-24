import type { IWrapBaseNote } from './baseNote.ts';
import type { IWrapBaseSlider } from './baseSlider.ts';
import type { ICustomDataSlider } from './custom/slider.ts';

/**
 * Wrapper attribute for beatmap chain.
 */
export interface IWrapChain extends IWrapBaseSlider {
   /**
    * Slice count or element in chain.
    *
    * **NOTE:** Must be more than `0`, the head counts as `1`.
    *
    * **Type:** `i32`
    */
   sliceCount: number;
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
   squish: number;
   customData: ICustomDataSlider;
}

/**
 * Wrapper attribute for beatmap chain link.
 */
export interface IWrapChainLink extends IWrapBaseNote {
   angle: number;
   chain: IWrapChain | null;
   customData: ICustomDataSlider;
}
