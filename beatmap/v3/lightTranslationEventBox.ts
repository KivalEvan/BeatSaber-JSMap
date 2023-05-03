import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import { IWrapLightTranslationEventBoxAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightTranslationEventBox } from '../wrapper/lightTranslationEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightTranslationBase } from './lightTranslationBase.ts';

/** Light translation event box beatmap v3 class object. */
export class LightTranslationEventBox extends WrapLightTranslationEventBox<
    Required<ILightTranslationEventBox>,
    Required<ILightTranslationBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightTranslationEventBox>> = {
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
        s: 0,
        t: 1,
        a: 0,
        r: 0,
        b: 0,
        i: 0,
        l: () => [],
        customData: () => {
            return {};
        },
    };

    private _f: IndexFilter;
    private _l: LightTranslationBase[];

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightTranslationEventBox>);
    constructor(
        data:
            & DeepPartial<ILightTranslationEventBox>
            & DeepPartial<
                IWrapLightTranslationEventBoxAttribute<
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightTranslationEventBox>
            & DeepPartial<
                IWrapLightTranslationEventBoxAttribute<
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super({
            f: (data.filter as IIndexFilter) ??
                (data as Required<ILightTranslationEventBox>).f ??
                LightTranslationEventBox.default.f(),
            w: data.beatDistribution ?? data.w ?? LightTranslationEventBox.default.w,
            d: data.beatDistributionType ?? data.d ?? LightTranslationEventBox.default.d,
            s: data.translationDistribution ?? data.s ?? LightTranslationEventBox.default.s,
            t: data.translationDistributionType ?? data.t ?? LightTranslationEventBox.default.t,
            a: data.axis ?? data.a ?? LightTranslationEventBox.default.a,
            r: data.flip ?? data.r ?? LightTranslationEventBox.default.r,
            b: data.affectFirst ?? data.b ?? LightTranslationEventBox.default.b,
            i: data.easing ?? data.i ?? LightTranslationEventBox.default.i,
            l: (data.events as ILightTranslationBase[]) ??
                (data as Required<ILightTranslationEventBox>).l ??
                LightTranslationEventBox.default.l(),
            customData: data.customData ?? LightTranslationEventBox.default.customData(),
        });
        this._f = new IndexFilter(this.data.f);
        this._l = this.data.l.map((obj) => new LightTranslationBase(obj));
    }

    static create(): LightTranslationEventBox[];
    static create(
        ...data: DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightTranslationEventBox[];
    static create(...data: DeepPartial<ILightTranslationEventBox>[]): LightTranslationEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightTranslationEventBox>
            & DeepPartial<
                IWrapLightTranslationEventBoxAttribute<
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightTranslationEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightTranslationEventBox>
            & DeepPartial<
                IWrapLightTranslationEventBoxAttribute<
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightTranslationEventBox[] {
        const result: LightTranslationEventBox[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightTranslationEventBox> {
        return {
            f: this.filter.toJSON(),
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.translationDistribution,
            t: this.translationDistributionType,
            a: this.axis,
            r: this.flip,
            b: this.affectFirst,
            i: this.easing,
            l: this.events.map((l) => l.toJSON()),
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
    set beatDistribution(value: ILightTranslationEventBox['w']) {
        this.data.w = value;
    }

    get beatDistributionType() {
        return this.data.d;
    }
    set beatDistributionType(value: ILightTranslationEventBox['d']) {
        this.data.d = value;
    }

    get translationDistribution() {
        return this.data.s;
    }
    set translationDistribution(value: ILightTranslationEventBox['s']) {
        this.data.s = value;
    }

    get translationDistributionType() {
        return this.data.t;
    }
    set translationDistributionType(value: ILightTranslationEventBox['t']) {
        this.data.t = value;
    }

    get axis() {
        return this.data.a;
    }
    set axis(value: ILightTranslationEventBox['a']) {
        this.data.a = value;
    }

    get flip(): ILightTranslationEventBox['r'] {
        return this.data.r;
    }
    set flip(value: ILightTranslationEventBox['r'] | boolean) {
        this.data.r = value ? 1 : 0;
    }

    get affectFirst(): ILightTranslationEventBox['b'] {
        return this.data.b;
    }
    set affectFirst(value: ILightTranslationEventBox['b'] | boolean) {
        this.data.b = value ? 1 : 0;
    }

    get easing() {
        return this.data.i;
    }
    set easing(value: ILightTranslationEventBox['i']) {
        this.data.i = value;
    }

    get events(): LightTranslationBase[] {
        return this._l;
    }
    set events(value: LightTranslationBase[]) {
        this._l = value;
    }

    get customData(): NonNullable<ILightTranslationEventBox['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightTranslationEventBox['customData']>) {
        this.data.customData = value;
    }

    setEvents(value: LightTranslationBase[]): this {
        this.events = value;
        return this;
    }
}
