import { BeatmapObject } from './baseObject.ts';

export interface BasicEvent extends BeatmapObject {
    /** event type */
    et: number;
    /** int */
    i: number;
    /** float */
    f: number;
}
