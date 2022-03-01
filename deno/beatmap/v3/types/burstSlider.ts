import { BaseSlider } from './baseSlider.ts';

export interface BurstSlider extends BaseSlider {
    /** Slice Amount
     * int */
    sc: number;
    /** Squish Amount
     * float */
    s: number;
}
