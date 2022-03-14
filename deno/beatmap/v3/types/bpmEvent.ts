import { IBaseObject, BaseObject } from './baseObject.ts';

export interface IBPMEvent extends IBaseObject {
    /** Value `<float>` of BPM change event. */
    m: number;
}

const defaultValue: Required<IBPMEvent> = {
    b: 0,
    m: 0,
};

/** BPM change event beatmap object. */
export class BPMEvent extends BaseObject<IBPMEvent> {
    private m;
    constructor(bpmEvent: Required<IBPMEvent>) {
        super(bpmEvent);
        this.m = bpmEvent.m;
    }

    static create(): BPMEvent;
    static create(bpmEvents: Partial<IBPMEvent>): BPMEvent;
    static create(...bpmEvents: Partial<IBPMEvent>[]): BPMEvent[];
    static create(...bpmEvents: Partial<IBPMEvent>[]): BPMEvent | BPMEvent[] {
        const result: BPMEvent[] = [];
        bpmEvents?.forEach((be) =>
            result.push(
                new BPMEvent({
                    b: be.b ?? defaultValue.b,
                    m: be.m ?? defaultValue.m,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new BPMEvent({
            b: defaultValue.b,
            m: defaultValue.m,
        });
    }

    toObject(): IBPMEvent {
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

    setBPM(value: IBPMEvent['m']) {
        this.bpm = value;
        return this;
    }
}
