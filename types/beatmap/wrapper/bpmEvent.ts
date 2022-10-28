import { IWrapBaseObject } from './baseObject.ts';

export interface IWrapBPMEvent extends IWrapBaseObject {
    /** Value `<float>` of BPM change event. */
    bpm: number;

    setBPM(value: number): this;
}
