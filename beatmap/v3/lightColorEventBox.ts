import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { IWrapLightColorEventBoxAttribute } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorEventBox } from '../wrapper/lightColorEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightColorBase } from './lightColorBase.ts';

/** Light color event box beatmap v3 class object. */
export class LightColorEventBox extends WrapLightColorEventBox<
    Required<ILightColorEventBox>,
    Required<ILightColorBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightColorEventBox>> = {
        f: () => {
            return {
                f: IndexFilter.default.f,
                p: IndexFilter.default.p,
                t: IndexFilter.default.t,
                r: IndexFilter.default.r,
                c: IndexFilter.default.c,
                n: IndexFilter.default.n,
                s: IndexFilter.default.s,
                l: IndexFilter.default.l,
                d: IndexFilter.default.d,
            };
        },
        w: 0,
        d: 1,
        r: 0,
        t: 1,
        b: 0,
        i: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    private _f: IndexFilter;
    private _e: LightColorBase[];

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightColorEventBoxAttribute<
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightColorEventBox>);
    constructor(
        data:
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super({
            f: (data.filter as IIndexFilter) ??
                (data as Required<ILightColorEventBox>).f ??
                LightColorEventBox.default.f(),
            w: data.beatDistribution ?? data.w ?? LightColorEventBox.default.w,
            d: data.beatDistributionType ?? data.d ?? LightColorEventBox.default.d,
            r: data.brightnessDistribution ?? data.r ?? LightColorEventBox.default.r,
            t: data.brightnessDistributionType ?? data.t ?? LightColorEventBox.default.t,
            b: data.affectFirst ?? data.b ?? LightColorEventBox.default.b,
            i: data.easing ?? data.i ?? LightColorEventBox.default.i,
            e: (data.events as ILightColorBase[]) ??
                (data as Required<ILightColorEventBox>).e ??
                LightColorEventBox.default.e(),
            customData: data.customData ?? LightColorEventBox.default.customData(),
        });
        this._f = new IndexFilter(this.data.f);
        this._e = this.data.e.map((obj) => new LightColorBase(obj));
    }

    static create(): LightColorEventBox[];
    static create(
        ...data: DeepPartial<
            IWrapLightColorEventBoxAttribute<
                Required<ILightColorEventBox>,
                Required<ILightColorBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightColorEventBox[];
    static create(...data: DeepPartial<ILightColorEventBox>[]): LightColorEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightColorEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<
                    Required<ILightColorEventBox>,
                    Required<ILightColorBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightColorEventBox[] {
        const result: LightColorEventBox[] = [];
        data?.forEach((eb) => result.push(new this(eb)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightColorEventBox> {
        return {
            f: this.filter.toJSON(),
            w: this.beatDistribution,
            d: this.beatDistributionType,
            r: this.brightnessDistribution,
            t: this.brightnessDistributionType,
            b: this.affectFirst,
            i: this.easing,
            e: this.events.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get filter() {
        return this._f;
    }
    set filter(value: IndexFilter) {
        this._f = value;
    }

    get beatDistribution() {
        return this.data.w;
    }
    set beatDistribution(value: ILightColorEventBox['w']) {
        this.data.w = value;
    }

    get beatDistributionType() {
        return this.data.d;
    }
    set beatDistributionType(value: ILightColorEventBox['d']) {
        this.data.d = value;
    }

    get brightnessDistribution() {
        return this.data.r;
    }
    set brightnessDistribution(value: ILightColorEventBox['r']) {
        this.data.r = value;
    }

    get brightnessDistributionType() {
        return this.data.t;
    }
    set brightnessDistributionType(value: ILightColorEventBox['t']) {
        this.data.t = value;
    }

    get affectFirst(): ILightColorEventBox['b'] {
        return this.data.b;
    }
    set affectFirst(value: ILightColorEventBox['b'] | boolean) {
        this.data.b = value ? 1 : 0;
    }

    get easing() {
        return this.data.i;
    }
    set easing(value: ILightColorEventBox['i']) {
        this.data.i = value;
    }

    get events(): LightColorBase[] {
        return this._e;
    }
    set events(value: LightColorBase[]) {
        this._e = value;
    }

    get customData(): NonNullable<ILightColorEventBox['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightColorEventBox['customData']>) {
        this.data.customData = value;
    }

    setEvents(value: LightColorBase[]): this {
        this.events = value;
        return this;
    }
}
