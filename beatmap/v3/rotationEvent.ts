import { IRotationEvent } from '../../types/beatmap/v3/rotationEvent.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapRotationEvent } from '../wrapper/rotationEvent.ts';

/** Rotation event beatmap v3 class object. */
export class RotationEvent extends WrapRotationEvent<Required<IRotationEvent>> {
    static default: ObjectReturnFn<Required<IRotationEvent>> = {
        b: 0,
        e: 0,
        r: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>);
    constructor(data: Partial<IRotationEvent>);
    constructor(
        data:
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>,
    );
    constructor(
        data:
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? RotationEvent.default.b,
            e: data.executionTime ?? data.e ?? RotationEvent.default.e,
            r: data.rotation ?? data.r ?? RotationEvent.default.r,
            customData: data.customData ?? RotationEvent.default.customData(),
        });
    }

    static create(): RotationEvent[];
    static create(
        ...data: Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>[]
    ): RotationEvent[];
    static create(...data: Partial<IRotationEvent>[]): RotationEvent[];
    static create(
        ...data: (
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>
        )[]
    ): RotationEvent[];
    static create(
        ...data: (
            & Partial<IRotationEvent>
            & Partial<IWrapRotationEventAttribute<Required<IRotationEvent>>>
        )[]
    ): RotationEvent[] {
        const result: RotationEvent[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IRotationEvent> {
        return {
            b: this.time,
            e: this.executionTime,
            r: this.rotation,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IRotationEvent['b']) {
        this.data.b = value;
    }

    get executionTime() {
        return this.data.e;
    }
    set executionTime(value: IRotationEvent['e']) {
        this.data.e = value;
    }

    get rotation() {
        return this.data.r;
    }
    set rotation(value: IRotationEvent['r']) {
        this.data.r = value;
    }

    get customData(): NonNullable<IRotationEvent['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IRotationEvent['customData']>) {
        this.data.customData = value;
    }
}
