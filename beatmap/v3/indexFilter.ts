import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { IWrapIndexFilterAttribute } from '../../types/beatmap/wrapper/indexFilter.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapIndexFilter } from '../wrapper/indexFilter.ts';

/** Index filter beatmap v3 class object. */
export class IndexFilter extends WrapIndexFilter<Required<IIndexFilter>> {
    static default: ObjectReturnFn<Required<IIndexFilter>> = {
        f: 1,
        p: 0,
        t: 0,
        r: 0,
        c: 0,
        n: 0,
        s: 0,
        l: 0,
        d: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapIndexFilterAttribute<Required<IIndexFilter>>>);
    constructor(data: Partial<IIndexFilter>);
    constructor(
        data: Partial<IIndexFilter> & Partial<IWrapIndexFilterAttribute<Required<IIndexFilter>>>,
    );
    constructor(
        data:
            & Partial<IIndexFilter>
            & Partial<IWrapIndexFilterAttribute<Required<IIndexFilter>>> = {},
    ) {
        super({
            f: data.type ?? data.f ?? IndexFilter.default.f,
            p: data.p0 ?? data.p ?? IndexFilter.default.p,
            t: data.p1 ?? data.t ?? IndexFilter.default.t,
            r: data.reverse ?? data.r ?? IndexFilter.default.r,
            c: data.chunks ?? data.c ?? IndexFilter.default.c,
            n: data.random ?? data.n ?? IndexFilter.default.n,
            s: data.seed ?? data.s ?? IndexFilter.default.s,
            l: data.limit ?? data.l ?? IndexFilter.default.l,
            d: data.limitAffectsType ?? data.d ?? IndexFilter.default.d,
            customData: data.customData ?? IndexFilter.default.customData(),
        });
    }

    static create(): IndexFilter;
    static create(data: Partial<IWrapIndexFilterAttribute<Required<IIndexFilter>>>): IndexFilter;
    static create(data: Partial<IIndexFilter>): IndexFilter;
    static create(
        data: Partial<IIndexFilter> & Partial<IWrapIndexFilterAttribute<Required<IIndexFilter>>>,
    ): IndexFilter;
    static create(
        data:
            & Partial<IIndexFilter>
            & Partial<IWrapIndexFilterAttribute<Required<IIndexFilter>>> = {},
    ): IndexFilter {
        return new IndexFilter(data);
    }

    toJSON(): Required<IIndexFilter> {
        return {
            f: this.type,
            p: this.p0,
            t: this.p1,
            r: this.reverse,
            c: this.chunks,
            n: this.random,
            s: this.seed,
            l: this.limit,
            d: this.limitAffectsType,
            customData: deepCopy(this.customData),
        };
    }

    get type() {
        return this.data.f;
    }
    set type(value: IIndexFilter['f']) {
        this.data.f = value;
    }

    get p0() {
        return this.data.p;
    }
    set p0(value: IIndexFilter['p']) {
        this.data.p = value;
    }

    get p1() {
        return this.data.t;
    }
    set p1(value: IIndexFilter['t']) {
        this.data.t = value;
    }

    get reverse() {
        return this.data.r;
    }
    set reverse(value: IIndexFilter['r']) {
        this.data.r = value;
    }

    get chunks() {
        return this.data.c;
    }
    set chunks(value: IIndexFilter['c']) {
        this.data.c = value;
    }

    get random() {
        return this.data.n;
    }
    set random(value: IIndexFilter['n']) {
        this.data.n = value;
    }

    get seed() {
        return this.data.s;
    }
    set seed(value: IIndexFilter['s']) {
        this.data.s = value;
    }

    get limit() {
        return this.data.l;
    }
    set limit(value: IIndexFilter['l']) {
        this.data.l = value;
    }

    get limitAffectsType() {
        return this.data.d;
    }
    set limitAffectsType(value: IIndexFilter['d']) {
        this.data.d = value;
    }

    get customData(): NonNullable<IIndexFilter['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IIndexFilter['customData']>) {
        this.data.customData = value;
    }
}
