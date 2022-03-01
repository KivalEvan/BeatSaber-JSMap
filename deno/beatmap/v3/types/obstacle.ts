import { BeatmapObject } from './baseObject.ts';

export interface Obstacle extends BeatmapObject {
    x: number;
    y: number;
    /** Duration
     * float */
    d: number;
    /** Width
     * int */
    w: number;
    /** Height
     * int */
    h: number;
}
