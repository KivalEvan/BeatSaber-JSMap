import { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapBPMEvent } from '../wrapper/bpmEvent.ts';

/** BPM change event beatmap v3 class object. */
export class BPMEvent extends WrapBPMEvent<Required<IBPMEvent>> {
    static default: ObjectReturnFn<Required<IBPMEvent>> = {
        b: 0,
        m: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>);
    constructor(data: Partial<IBPMEvent>);
    constructor(data: Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>);
    constructor(
        data: Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? BPMEvent.default.b,
            m: data.bpm ?? data.m ?? BPMEvent.default.m,
            customData: data.customData ?? BPMEvent.default.customData(),
        });
    }

    static create(): BPMEvent[];
    static create(...data: Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>[]): BPMEvent[];
    static create(...data: Partial<IBPMEvent>[]): BPMEvent[];
    static create(
        ...data: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>)[]
    ): BPMEvent[];
    static create(
        ...data: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<Required<IBPMEvent>>>)[]
    ): BPMEvent[] {
        const result: BPMEvent[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IBPMEvent> {
        return {
            b: this.time,
            m: this.bpm,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IBPMEvent['b']) {
        this.data.b = value;
    }

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

    get customData(): NonNullable<IBPMEvent['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IBPMEvent['customData']>) {
        this.data.customData = value;
    }

    isValid(): boolean {
        return this.bpm > 0;
    }
}
