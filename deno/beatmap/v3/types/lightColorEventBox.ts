import { DeepPartial, ObjectToReturn } from '../../../utils.ts';
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

const defaultValue: ObjectToReturn<ILightColorEventBox> = {
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
    r: 0,
    t: 1,
    b: 0,
    e: () => [],
};

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
        this.e = lightColorEventBox.e.map((e) => LightColorBase.create(e));
    }

    static create(): LightColorEventBox;
    static create(eventBoxes: DeepPartial<ILightColorEventBox>): LightColorEventBox;
    static create(
        ...eventBoxes: DeepPartial<ILightColorEventBox>[]
    ): LightColorEventBox[];
    static create(
        ...eventBoxes: DeepPartial<ILightColorEventBox>[]
    ): LightColorEventBox | LightColorEventBox[] {
        const result: LightColorEventBox[] = [];
        eventBoxes?.forEach((eb) =>
            result.push(
                new LightColorEventBox({
                    f: (eb as Required<ILightColorEventBox>).f ?? defaultValue.f(),
                    w: eb.w ?? defaultValue.w,
                    d: eb.d ?? defaultValue.d,
                    r: eb.r ?? defaultValue.r,
                    t: eb.t ?? defaultValue.t,
                    b: eb.b ?? defaultValue.b,
                    e: (eb as Required<ILightColorEventBox>).e ?? defaultValue.e(),
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
            f: defaultValue.f(),
            w: defaultValue.w,
            d: defaultValue.d,
            r: defaultValue.r,
            t: defaultValue.t,
            b: defaultValue.b,
            e: defaultValue.e(),
        });
    }

    toObject(): ILightColorEventBox {
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

    /** Brightness distribution `<float>` of light color event box.
     *
     * Range: `0-1` (0% to 100%), can be more than 1.
     */
    get brightnessDistribution() {
        return this.r;
    }
    set brightnessDistribution(value: ILightColorEventBox['r']) {
        this.r = value;
    }

    /** Brightness distribution type `<int>` of light color event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    get brightnessDistributionType() {
        return this.t;
    }
    set brightnessDistributionType(value: ILightColorEventBox['t']) {
        this.t = value;
    }

    /** Brigthness distribution should affect first event `<int>` of light color event box. */
    get affectFirst(): ILightColorEventBox['b'] {
        return this.b;
    }
    set affectFirst(value: ILightColorEventBox['b'] | boolean) {
        this.b = value ? 1 : 0;
    }

    /** Light color base data list. */
    get events() {
        return this.e;
    }
    set events(value: LightColorBase[]) {
        this.e = value;
    }
}
