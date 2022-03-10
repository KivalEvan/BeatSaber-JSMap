import { BaseSlider } from './baseSlider.ts';

/** Burst slider beatmap object. */
export interface BurstSlider extends BaseSlider {
    /** Slice count or element `<int>` in burst slider.
     *
     * Must be more than 0, slice count include the head.
     */
    sc: number;
    /** Squish percent `<float>` of element in burst slider.
     *
     * **WARNING:** Value `0` will crash the game.
     */
    s: number;
}
