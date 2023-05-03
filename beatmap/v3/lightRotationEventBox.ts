import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { IWrapLightRotationEventBoxAttribute } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightRotationBase } from './lightRotationBase.ts';

/** Light rotation event box beatmap v3 class object. */
export class LightRotationEventBox extends WrapLightRotationEventBox<
    Required<ILightRotationEventBox>,
    Required<ILightRotationBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightRotationEventBox>> = {
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
    private _l: LightRotationBase[];

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightRotationEventBoxAttribute<
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightRotationEventBox>);
    constructor(
        data:
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super({
            f: (data.filter as IIndexFilter) ??
                (data as Required<ILightRotationEventBox>).f ??
                LightRotationEventBox.default.f(),
            w: data.beatDistribution ?? data.w ?? LightRotationEventBox.default.w,
            d: data.beatDistributionType ?? data.d ?? LightRotationEventBox.default.d,
            s: data.rotationDistribution ?? data.s ?? LightRotationEventBox.default.s,
            t: data.rotationDistributionType ?? data.t ?? LightRotationEventBox.default.t,
            a: data.axis ?? data.a ?? LightRotationEventBox.default.a,
            r: data.flip ?? data.r ?? LightRotationEventBox.default.r,
            b: data.affectFirst ?? data.b ?? LightRotationEventBox.default.b,
            i: data.easing ?? data.i ?? LightRotationEventBox.default.i,
            l: (data.events as ILightRotationBase[]) ??
                (data as Required<ILightRotationEventBox>).l ??
                LightRotationEventBox.default.l(),
            customData: data.customData ?? LightRotationEventBox.default.customData(),
        });
        this._f = IndexFilter.create(this.data.f);
        this._l = this.data.l.map((obj) => new LightRotationBase(obj));
    }

    static create(): LightRotationEventBox[];
    static create(
        ...data: DeepPartial<
            IWrapLightRotationEventBoxAttribute<
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightRotationEventBox[];
    static create(...data: DeepPartial<ILightRotationEventBox>[]): LightRotationEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightRotationEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightRotationEventBox[] {
        const result: LightRotationEventBox[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightRotationEventBox> {
        return {
            f: this.filter.toJSON(),
            w: this.beatDistribution,
            d: this.beatDistributionType,
            s: this.rotationDistribution,
            t: this.rotationDistributionType,
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
    set beatDistribution(value: ILightRotationEventBox['w']) {
        this.data.w = value;
    }

    get beatDistributionType() {
        return this.data.d;
    }
    set beatDistributionType(value: ILightRotationEventBox['d']) {
        this.data.d = value;
    }

    get rotationDistribution() {
        return this.data.s;
    }
    set rotationDistribution(value: ILightRotationEventBox['s']) {
        this.data.s = value;
    }

    get rotationDistributionType() {
        return this.data.t;
    }
    set rotationDistributionType(value: ILightRotationEventBox['t']) {
        this.data.t = value;
    }

    get axis() {
        return this.data.a;
    }
    set axis(value: ILightRotationEventBox['a']) {
        this.data.a = value;
    }

    get flip(): ILightRotationEventBox['r'] {
        return this.data.r;
    }
    set flip(value: ILightRotationEventBox['r'] | boolean) {
        this.data.r = value ? 1 : 0;
    }

    get affectFirst(): ILightRotationEventBox['b'] {
        return this.data.b;
    }
    set affectFirst(value: ILightRotationEventBox['b'] | boolean) {
        this.data.b = value ? 1 : 0;
    }

    get easing() {
        return this.data.i;
    }
    set easing(value: ILightRotationEventBox['i']) {
        this.data.i = value;
    }

    get events() {
        return this._l;
    }
    set events(value: LightRotationBase[]) {
        this._l = value;
    }

    get customData(): NonNullable<ILightRotationEventBox['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightRotationEventBox['customData']>) {
        this.data.customData = value;
    }

    setEvents(value: LightRotationBase[]): this {
        this.events = value;
        return this;
    }
}
