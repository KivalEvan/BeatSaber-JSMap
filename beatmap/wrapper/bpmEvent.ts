import { WrapBaseObject } from './baseObject.ts';
import { IWrapBPMEvent } from '../../types/beatmap/wrapper/bpmEvent.ts';

/** BPM change event beatmap class object. */
export abstract class WrapBPMEvent<T extends Record<keyof T, unknown>> extends WrapBaseObject<T>
    implements IWrapBPMEvent<T> {
    protected _bpm!: IWrapBPMEvent['bpm'];

    abstract get bpm(): IWrapBPMEvent['bpm'];
    abstract set bpm(value: IWrapBPMEvent['bpm']);

    setBPM(value: IWrapBPMEvent['bpm']) {
        this.bpm = value;
        return this;
    }

    isValid(): boolean {
        return this.bpm > 0;
    }
}
