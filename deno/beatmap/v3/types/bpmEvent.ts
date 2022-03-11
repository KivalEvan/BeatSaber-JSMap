import { IBaseObject, BaseObject } from './baseObject.ts';

/** BPM change event beatmap object. */
export interface IBPMEvent extends IBaseObject {
    /** Value `<float>` of BPM change event. */
    m: number;
}

/** BPM change event beatmap object. */
export class BPMEvent extends BaseObject<IBPMEvent> {
    private m;
    constructor(bpmEvent: IBPMEvent) {
        super(bpmEvent);
        this.m = bpmEvent.m;
    }

    public toObject(): IBPMEvent {
        return {
            b: this.time,
            m: this.bpm,
        };
    }

    /** Value `<float>` of BPM change event. */
    get bpm() {
        return this.m;
    }
    set bpm(value: IBPMEvent['m']) {
        this.m = value;
    }
}
