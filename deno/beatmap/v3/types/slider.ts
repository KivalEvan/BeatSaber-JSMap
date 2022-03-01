import { BaseSlider } from './baseSlider.ts';

export interface Slider extends BaseSlider {
    /** headControlPointLengthMultiplier
     * int */
    mu: number;
    /** tailControlPointLengthMultiplier
     * float */
    tmu: number;
    /** Tail Cut Direction
     * int */
    tc: number;
    /** Slider Mid Anchor Mode
     * int */
    m: 0 | 1 | 2;
}
