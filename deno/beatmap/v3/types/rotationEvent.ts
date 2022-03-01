import { BeatmapObject } from './baseObject.ts';

export interface RotationEvent extends BeatmapObject {
    /** Execution Time
     * unknown */
    e: unknown;
    /** Rotation
     * float */
    r: number;
}
