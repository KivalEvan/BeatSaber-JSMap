import { BaseObject } from './baseObject.ts';

/** BPM change event beatmap object. */
export interface BPMChangeEvent extends BaseObject {
    /** Value `<float>` of BPM change event. */
    m: number;
}
