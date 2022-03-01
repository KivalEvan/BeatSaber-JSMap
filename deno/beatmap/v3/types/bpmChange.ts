import { BeatmapObject } from './baseObject.ts';

export interface BPMChangeEvent extends BeatmapObject {
    /** float */
    m: number;
}
