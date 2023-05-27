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
    ILightRotationEventBox,
    ILightRotationBase,
    IIndexFilter
> {
    static default: ObjectReturnFn<ILightRotationEventBox> = {
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

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightRotationEventBoxAttribute<
                ILightRotationEventBox,
                ILightRotationBase,
                IIndexFilter
            >
        >,
    );
    constructor(data: DeepPartial<ILightRotationEventBox>);
    constructor(
        data:
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    ILightRotationEventBox,
                    ILightRotationBase,
                    IIndexFilter
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    ILightRotationEventBox,
                    ILightRotationBase,
                    IIndexFilter
                >
            > = {},
    ) {
        super();

        this._filter = new IndexFilter(
            (data.filter as IIndexFilter) ??
                (data as ILightRotationEventBox).f ??
                LightRotationEventBox.default.f(),
        );
        this._beatDistribution = data.beatDistribution ?? data.w ?? LightRotationEventBox.default.w;
        this._beatDistributionType = data.beatDistributionType ?? data.d ??
            LightRotationEventBox.default.d;
        this._rotationDistribution = data.rotationDistribution ?? data.s ??
            LightRotationEventBox.default.s;
        this._rotationDistributionType = data.rotationDistributionType ?? data.t ??
            LightRotationEventBox.default.t;
        this._axis = data.axis ?? data.a ?? LightRotationEventBox.default.a;
        this._flip = data.flip ?? data.r ?? LightRotationEventBox.default.r;
        this._affectFirst = data.affectFirst ?? data.b ?? LightRotationEventBox.default.b;
        this._easing = data.easing ?? data.i ?? LightRotationEventBox.default.i;
        this._events = (
            (data.events as ILightRotationBase[]) ??
                (data as ILightRotationEventBox).l ??
                LightRotationEventBox.default.l()
        ).map((obj) => new LightRotationBase(obj));
        this._customData = data.customData ?? LightRotationEventBox.default.customData();
    }

    static create(): LightRotationEventBox[];
    static create(
        ...data: DeepPartial<
            IWrapLightRotationEventBoxAttribute<
                ILightRotationEventBox,
                ILightRotationBase,
                IIndexFilter
            >
        >[]
    ): LightRotationEventBox[];
    static create(...data: DeepPartial<ILightRotationEventBox>[]): LightRotationEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    ILightRotationEventBox,
                    ILightRotationBase,
                    IIndexFilter
                >
            >
        )[]
    ): LightRotationEventBox[];
    static create(
        ...data: (
            & DeepPartial<ILightRotationEventBox>
            & DeepPartial<
                IWrapLightRotationEventBoxAttribute<
                    ILightRotationEventBox,
                    ILightRotationBase,
                    IIndexFilter
                >
            >
        )[]
    ): LightRotationEventBox[] {
        const result: LightRotationEventBox[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): ILightRotationEventBox {
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
        return this._filter as IndexFilter;
    }
    set filter(value: IndexFilter) {
        this._filter = value;
    }

    get beatDistribution() {
        return this._beatDistribution;
    }
    set beatDistribution(value: ILightRotationEventBox['w']) {
        this._beatDistribution = value;
    }

    get beatDistributionType() {
        return this._beatDistributionType;
    }
    set beatDistributionType(value: ILightRotationEventBox['d']) {
        this._beatDistributionType = value;
    }

    get rotationDistribution() {
        return this._rotationDistribution;
    }
    set rotationDistribution(value: ILightRotationEventBox['s']) {
        this._rotationDistribution = value;
    }

    get rotationDistributionType() {
        return this._rotationDistributionType;
    }
    set rotationDistributionType(value: ILightRotationEventBox['t']) {
        this._rotationDistributionType = value;
    }

    get axis() {
        return this._axis;
    }
    set axis(value: ILightRotationEventBox['a']) {
        this._axis = value;
    }

    get flip(): ILightRotationEventBox['r'] {
        return this._flip;
    }
    set flip(value: ILightRotationEventBox['r'] | boolean) {
        this._flip = value ? 1 : 0;
    }

    get affectFirst(): ILightRotationEventBox['b'] {
        return this._affectFirst;
    }
    set affectFirst(value: ILightRotationEventBox['b'] | boolean) {
        this._affectFirst = value ? 1 : 0;
    }

    get easing() {
        return this._easing;
    }
    set easing(value: ILightRotationEventBox['i']) {
        this._easing = value;
    }

    get events() {
        return this._events as LightRotationBase[];
    }
    set events(value: LightRotationBase[]) {
        this._events = value;
    }

    get customData(): NonNullable<ILightRotationEventBox['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<ILightRotationEventBox['customData']>) {
        this._customData = value;
    }

    setEvents(value: LightRotationBase[]): this {
        this.events = value;
        return this;
    }
}
