import { IEventBox, EventBox } from './eventBox.ts';
import { ILightColorBase, LightColorBase } from './lightColorBase.ts';

export interface ILightColorEventBox extends IEventBox {
    /** Brightness distribution `<float>` of light color event box.
     *
     * Range: `0-1` (0% to 100%), can be more than 1.
     */
    r: number;
    /** Brightness distribution type `<int>` of light color event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    t: 1 | 2;
    /** Brigthness distribution should affect first event `<int>` of light color event box. */
    b: 0 | 1;
    /** Light color base data list. */
    e: ILightColorBase[];
}

export class LightColorEventBox extends EventBox {
    private r;
    private t;
    private b;
    private e: LightColorBase[];
    constructor(lightColorEventBox: Required<ILightColorEventBox>) {
        super(lightColorEventBox);
        this.r = lightColorEventBox.r;
        this.t = lightColorEventBox.t;
        this.b = lightColorEventBox.b;
        this.e = lightColorEventBox.e.map((e) => new LightColorBase(e));
    }

    static create(): LightColorEventBox;
    static create(eventBoxes: Partial<ILightColorEventBox>): LightColorEventBox;
    static create(...eventBoxes: Partial<ILightColorEventBox>[]): LightColorEventBox[];
    static create(
        ...eventBoxes: Partial<ILightColorEventBox>[]
    ): LightColorEventBox | LightColorEventBox[] {
        const result: LightColorEventBox[] = [];
        eventBoxes?.forEach((eb) =>
            result.push(
                new LightColorEventBox({
                    f: eb.f ?? {
                        f: 1,
                        p: 1,
                        t: 1,
                        r: 0,
                    },
                    w: eb.w ?? 0,
                    d: eb.d ?? 1,
                    r: eb.r ?? 0,
                    t: eb.t ?? 1,
                    b: eb.b ?? 0,
                    e: eb.e ?? [],
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new LightColorEventBox({
            f: {
                f: 1,
                p: 1,
                t: 1,
                r: 0,
            },
            w: 0,
            d: 1,
            r: 0,
            t: 1,
            b: 0,
            e: [],
        });
    }

    public toObject(): ILightColorEventBox {
        return {
            f: this.filter.toObject(),
            w: this.beatDistribution,
            d: this.beatDistributionType,
            r: this.brightnessDistribution,
            t: this.brightnessDistributionType,
            b: this.affectFirst,
            e: this.events.map((e) => e.toObject()),
        };
    }

    get brightnessDistribution() {
        return this.r;
    }
    set brightnessDistribution(value: ILightColorEventBox['r']) {
        this.r = value;
    }

    get brightnessDistributionType() {
        return this.t;
    }
    set brightnessDistributionType(value: ILightColorEventBox['t']) {
        this.t = value;
    }

    get affectFirst() {
        return this.b;
    }
    set affectFirst(value: ILightColorEventBox['b']) {
        this.b = value;
    }

    get events() {
        return this.e;
    }
    set events(value: LightColorBase[]) {
        this.e = value;
    }
}
