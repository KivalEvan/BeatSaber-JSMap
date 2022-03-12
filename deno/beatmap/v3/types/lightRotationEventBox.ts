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
                    f: eb.f ?? {
                        f: 1,
                        p: 1,
                        t: 1,
                        r: 0,
                    },
                    w: eb.w ?? 0,
                    d: eb.d ?? 1,
                    s: eb.s ?? 0,
                    t: eb.t ?? 1,
                    a: eb.a ?? 0,
                    r: eb.r ?? 0,
                    b: eb.b ?? 0,
                    l: eb.l ?? [],
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
            f: {
                f: 1,
                p: 1,
                t: 1,
                r: 0,
            },
            w: 0,
            d: 1,
            s: 0,
            t: 1,
            a: 0,
            r: 0,
            b: 0,
            l: [],
        });
    }

    public toObject(): ILightRotationEventBox {
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

    get rotationDistribution() {
        return this.s;
    }
    set rotationDistribution(value: ILightRotationEventBox['s']) {
        this.s = value;
    }

    get rotationDistributionType() {
        return this.t;
    }
    set rotationDistributionType(value: ILightRotationEventBox['t']) {
        this.t = value;
    }

    get axis() {
        return this.a;
    }
    set axis(value: ILightRotationEventBox['a']) {
        this.a = value;
    }

    get flip() {
        return this.r;
    }
    set flip(value: ILightRotationEventBox['r']) {
        this.r = value;
    }

    get affectFirst() {
        return this.b;
    }
    set affectFirst(value: ILightRotationEventBox['b']) {
        this.b = value;
    }

    get events() {
        return this.l;
    }
    set events(value: LightRotationBase[]) {
        this.l = value;
    }
}
