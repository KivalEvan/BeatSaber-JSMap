import { IWrapBaseObject } from './baseObject.ts';

export interface IWrapBPMEvent<
    T extends Record<keyof T, unknown> = Record<string, unknown>,
> extends IWrapBaseObject<T> {
    /** Value `<float>` of BPM change event. */
    bpm: number;

    setBPM(value: number): this;
}
