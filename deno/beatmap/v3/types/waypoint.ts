import { BeatmapObject } from './baseObject.ts';

export interface Waypoint extends BeatmapObject {
    x: number;
    y: number;
    /** offsetDirection
     * int */
    d: number;
}
