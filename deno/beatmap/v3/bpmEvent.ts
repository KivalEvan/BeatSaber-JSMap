import { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import { BaseObject } from './baseObject.ts';

/** BPM change event beatmap object. */
export class BPMEvent extends BaseObject<IBPMEvent> {
    static default: Required<IBPMEvent> = {
        b: 0,
        m: 0,
    };

    private constructor(bpmEvent: Required<IBPMEvent>) {
        super(bpmEvent);
    }

    static create(): BPMEvent;
    static create(bpmEvents: Partial<IBPMEvent>): BPMEvent;
    static create(...bpmEvents: Partial<IBPMEvent>[]): BPMEvent[];
    static create(...bpmEvents: Partial<IBPMEvent>[]): BPMEvent | BPMEvent[] {
        const result: BPMEvent[] = [];
        bpmEvents?.forEach((be) =>
            result.push(
                new BPMEvent({
                    b: be.b ?? BPMEvent.default.b,
                    m: be.m ?? BPMEvent.default.m,
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
            b: BPMEvent.default.b,
            m: BPMEvent.default.m,
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
        return this.data.m;
    }
    set bpm(value: IBPMEvent['m']) {
        this.data.m = value;
    }

    setBPM(value: IBPMEvent['m']) {
        this.bpm = value;
        return this;
    }
}