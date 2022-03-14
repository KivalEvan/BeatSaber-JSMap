import { ObjectToReturn } from '../../../utils.ts';
import { IEventBox, EventBox } from './eventBox.ts';
import { ILightRotationBase, LightRotationBase } from './lightRotationBase.ts';

export interface ILightRotationEventBox extends IEventBox {
    /** Rotation distribution `<float>` of light rotation event box. */
    s: number;
    /** Rotation distribution type `<int>` of light rotation event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    t: 1 | 2;
    /** Axis `<int>` of light rotation event box.
     * ```ts
     * 0 -> X
     * 1 -> Y
     * ```
     */
    a: 0 | 1;
    /** Flip rotation `<int>` in light rotation event box. */
    r: 0 | 1;
    /** Rotation distribution should affect first event `<int>` of light rotation event box. */
    b: 0 | 1;
    /** Light rotation base data list. */
    l: ILightRotationBase[];
}

const defaultValue: ObjectToReturn<ILightRotationEventBox> = {
    f: () => {
        return {
            f: 1,
            p: 1,
            t: 1,
            r: 0,
        };
    },
    w: 0,
    d: 1,
    s: 0,
    t: 1,
    a: 0,
    r: 0,
    b: 0,
    l: () => [],
};

export class LightRotationEventBox extends EventBox {
    private s;
    private t;
    private a;
    private r;
    private b;
    private l: LightRotationBase[];
    constructor(lightRotationEventBox: Required<ILightRotationEventBox>) {
        super(lightRotationEventBox);
        this.s = lightRotationEventBox.s;
        this.t = lightRotationEventBox.t;
        this.a = lightRotationEventBox.a;
        this.r = lightRotationEventBox.r;
        this.b = lightRotationEventBox.b;
        this.l = lightRotationEventBox.l.map((l) => new LightRotationBase(l));
    }

    static create(): LightRotationEventBox;
    static create(eventBoxes: Partial<ILightRotationEventBox>): LightRotationEventBox;
    static create(
        ...eventBoxes: Partial<ILightRotationEventBox>[]
    ): LightRotationEventBox[];
    static create(
        ...eventBoxes: Partial<ILightRotationEventBox>[]
    ): LightRotationEventBox | LightRotationEventBox[] {
        const result: LightRotationEventBox[] = [];
        eventBoxes?.forEach((eb) =>
            result.push(
                new LightRotationEventBox({
                    f: eb.f ?? defaultValue.f(),
                    w: eb.w ?? defaultValue.w,
                    d: eb.d ?? defaultValue.d,
                    s: eb.s ?? defaultValue.s,
                    t: eb.t ?? defaultValue.t,
                    a: eb.a ?? defaultValue.a,
                    r: eb.r ?? defaultValue.r,
                    b: eb.b ?? defaultValue.b,
                    l: eb.l ?? defaultValue.l(),
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new LightRotationEventBox({
            f: defaultValue.f(),
            w: defaultValue.w,
            d: defaultValue.d,
            s: defaultValue.s,
            t: defaultValue.t,
            a: defaultValue.a,
            r: defaultValue.r,
            b: defaultValue.b,
            l: defaultValue.l(),
        });
    }

    toObject(): ILightRotationEventBox {
        return {
            f: this.filter.toObject(),
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.rotationDistribution,
            t: this.rotationDistributionType,
            a: this.axis,
            r: this.flip,
            b: this.affectFirst,
            l: this.events.map((l) => l.toObject()),
        };
    }

    /** Rotation distribution `<float>` of light rotation event box. */
    get rotationDistribution() {
        return this.s;
    }
    set rotationDistribution(value: ILightRotationEventBox['s']) {
        this.s = value;
    }

    /** Rotation distribution type `<int>` of light rotation event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    get rotationDistributionType() {
        return this.t;
    }
    set rotationDistributionType(value: ILightRotationEventBox['t']) {
        this.t = value;
    }

    /** Axis `<int>` of light rotation event box.
     * ```ts
     * 0 -> X
     * 1 -> Y
     * ```
     */
    get axis() {
        return this.a;
    }
    set axis(value: ILightRotationEventBox['a']) {
        this.a = value;
    }

    /** Flip rotation `<int>` in light rotation event box. */
    get flip(): ILightRotationEventBox['r'] {
        return this.r;
    }
    set flip(value: ILightRotationEventBox['r'] | boolean) {
        this.r = value ? 1 : 0;
    }

    /** Rotation distribution should affect first event `<int>` of light rotation event box. */
    get affectFirst(): ILightRotationEventBox['b'] {
        return this.b;
    }
    set affectFirst(value: ILightRotationEventBox['b'] | boolean) {
        this.b = value ? 1 : 0;
    }

    /** Light rotation base data list. */
    get events() {
        return this.l;
    }
    set events(value: LightRotationBase[]) {
        this.l = value;
    }
}
