import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { IWrapIndexFilterAttribute } from '../../types/beatmap/wrapper/indexFilter.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapIndexFilter } from '../wrapper/indexFilter.ts';

/** Index filter beatmap v3 class object. */
export class IndexFilter extends WrapIndexFilter<IIndexFilter> {
    static default: ObjectReturnFn<IIndexFilter> = {
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
    constructor(data: Partial<IWrapIndexFilterAttribute<IIndexFilter>>);
    constructor(data: Partial<IIndexFilter>);
    constructor(data: Partial<IIndexFilter> & Partial<IWrapIndexFilterAttribute<IIndexFilter>>);
    constructor(
        data: Partial<IIndexFilter> & Partial<IWrapIndexFilterAttribute<IIndexFilter>> = {},
    ) {
        super();

        this._type = data.type ?? data.f ?? IndexFilter.default.f;
        this._p0 = data.p0 ?? data.p ?? IndexFilter.default.p;
        this._p1 = data.p1 ?? data.t ?? IndexFilter.default.t;
        this._reverse = data.reverse ?? data.r ?? IndexFilter.default.r;
        this._chunks = data.chunks ?? data.c ?? IndexFilter.default.c;
        this._random = data.random ?? data.n ?? IndexFilter.default.n;
        this._seed = data.seed ?? data.s ?? IndexFilter.default.s;
        this._limit = data.limit ?? data.l ?? IndexFilter.default.l;
        this._limitAffectsType = data.limitAffectsType ?? data.d ?? IndexFilter.default.d;
        this._customData = data.customData ?? IndexFilter.default.customData();
    }

    static create(): IndexFilter;
    static create(data: Partial<IWrapIndexFilterAttribute<IIndexFilter>>): IndexFilter;
    static create(data: Partial<IIndexFilter>): IndexFilter;
    static create(
        data: Partial<IIndexFilter> & Partial<IWrapIndexFilterAttribute<IIndexFilter>>,
    ): IndexFilter;
    static create(
        data: Partial<IIndexFilter> & Partial<IWrapIndexFilterAttribute<IIndexFilter>> = {},
    ): IndexFilter {
        return new IndexFilter(data);
    }

    toJSON(): IIndexFilter {
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
        return this._type;
    }
    set type(value: IIndexFilter['f']) {
        this._type = value;
    }

    get p0() {
        return this._p0;
    }
    set p0(value: IIndexFilter['p']) {
        this._p0 = value;
    }

    get p1() {
        return this._p1;
    }
    set p1(value: IIndexFilter['t']) {
        this._p1 = value;
    }

    get reverse() {
        return this._reverse;
    }
    set reverse(value: IIndexFilter['r']) {
        this._reverse = value;
    }

    get chunks() {
        return this._chunks;
    }
    set chunks(value: IIndexFilter['c']) {
        this._chunks = value;
    }

    get random() {
        return this._random;
    }
    set random(value: IIndexFilter['n']) {
        this._random = value;
    }

    get seed() {
        return this._seed;
    }
    set seed(value: IIndexFilter['s']) {
        this._seed = value;
    }

    get limit() {
        return this._limit;
    }
    set limit(value: IIndexFilter['l']) {
        this._limit = value;
    }

    get limitAffectsType() {
        return this._limitAffectsType;
    }
    set limitAffectsType(value: IIndexFilter['d']) {
        this._limitAffectsType = value;
    }

    get customData(): NonNullable<IIndexFilter['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<IIndexFilter['customData']>) {
        this._customData = value;
    }
}
