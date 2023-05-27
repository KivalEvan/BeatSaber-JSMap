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
    ILightColorEventBox,
    ILightColorBase,
    IIndexFilter
> {
    static default: ObjectReturnFn<ILightColorEventBox> = {
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

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightColorEventBoxAttribute<ILightColorEventBox, ILightColorBase, IIndexFilter>
        >,
    );
    constructor(data: DeepPartial<ILightColorEventBox>);
    constructor(
        data:
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<ILightColorEventBox, ILightColorBase, IIndexFilter>
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<ILightColorEventBox, ILightColorBase, IIndexFilter>
            > = {},
    ) {
        super();

        this._filter = new IndexFilter(
            (data.filter as IIndexFilter) ??
                (data as ILightColorEventBox).f ??
                LightColorEventBox.default.f(),
        );
        this._beatDistribution = data.beatDistribution ?? data.w ?? LightColorEventBox.default.w;
        this._beatDistributionType = data.beatDistributionType ?? data.d ??
            LightColorEventBox.default.d;
        this._brightnessDistribution = data.brightnessDistribution ?? data.r ??
            LightColorEventBox.default.r;
        this._brightnessDistributionType = data.brightnessDistributionType ?? data.t ??
            LightColorEventBox.default.t;
        this._affectFirst = data.affectFirst ?? data.b ?? LightColorEventBox.default.b;
        this._easing = data.easing ?? data.i ?? LightColorEventBox.default.i;
        this._events = (
            (data.events as ILightColorBase[]) ??
                (data as ILightColorEventBox).e ??
                LightColorEventBox.default.e()
        ).map((obj) => new LightColorBase(obj));
        this._customData = data.customData ?? LightColorEventBox.default.customData();
    }

    static create(): LightColorEventBox[];
    static create(
        ...data: DeepPartial<
            IWrapLightColorEventBoxAttribute<ILightColorEventBox, ILightColorBase, IIndexFilter>
        >[]
    ): LightColorEventBox[];
    static create(...data: DeepPartial<ILightColorEventBox>[]): LightColorEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<ILightColorEventBox, ILightColorBase, IIndexFilter>
            >
        )[]
    ): LightColorEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightColorEventBox>
            & DeepPartial<
                IWrapLightColorEventBoxAttribute<ILightColorEventBox, ILightColorBase, IIndexFilter>
            >
        )[]
    ): LightColorEventBox[] {
        const result: LightColorEventBox[] = [];
        data.forEach((eb) => result.push(new this(eb)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): ILightColorEventBox {
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
        return this._filter as IndexFilter;
    }
    set filter(value: IndexFilter) {
        this._filter = value;
    }

    get beatDistribution() {
        return this._beatDistribution;
    }
    set beatDistribution(value: ILightColorEventBox['w']) {
        this._beatDistribution = value;
    }

    get beatDistributionType() {
        return this._beatDistributionType;
    }
    set beatDistributionType(value: ILightColorEventBox['d']) {
        this._beatDistributionType = value;
    }

    get brightnessDistribution() {
        return this._brightnessDistribution;
    }
    set brightnessDistribution(value: ILightColorEventBox['r']) {
        this._brightnessDistribution = value;
    }

    get brightnessDistributionType() {
        return this._brightnessDistributionType;
    }
    set brightnessDistributionType(value: ILightColorEventBox['t']) {
        this._brightnessDistributionType = value;
    }

    get affectFirst(): ILightColorEventBox['b'] {
        return this._affectFirst;
    }
    set affectFirst(value: ILightColorEventBox['b'] | boolean) {
        this._affectFirst = value ? 1 : 0;
    }

    get easing() {
        return this._easing;
    }
    set easing(value: ILightColorEventBox['i']) {
        this._easing = value;
    }

    get events() {
        return this._events as LightColorBase[];
    }
    set events(value: LightColorBase[]) {
        this._events = value;
    }

    get customData(): NonNullable<ILightColorEventBox['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<ILightColorEventBox['customData']>) {
        this._customData = value;
    }

    setEvents(value: LightColorBase[]): this {
        this.events = value;
        return this;
    }
}
