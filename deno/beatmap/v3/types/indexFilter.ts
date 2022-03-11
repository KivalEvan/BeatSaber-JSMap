import { Serializable } from '../../shared/types/serializable.ts';

interface IIndexFilterBase {
    /** Type `<int>` of index filter.
     * ```ts
     * 1 -> Division
     * 2 -> Step And Offset
     * ```
     */
    f: 1 | 2;
    /** Parameter 0 `<int>` in index filter. */
    p: number;
    /** Parameter 1 `<int>` in index filter. */
    t: number;
    /** Reversed `<int>` in index filter. */
    r: 0 | 1;
}

interface IIndexFilterSection extends IIndexFilterBase {
    f: 1;
    /** Divide into sections `<int>` in index filter. */
    p: number;
    /** Get section by ID `<int>` in index filter. */
    t: number;
}

interface IIndexFilterStepOffset extends IIndexFilterBase {
    f: 2;
    /** Light ID `<int>` in index filter. */
    p: number;
    /** Skip step `<int>` in index filter. */
    t: number;
}

export type IIndexFilter = IIndexFilterSection | IIndexFilterStepOffset;

export class IndexFilter extends Serializable<IIndexFilter> {
    private f;
    private p;
    private t;
    private r;
    constructor(indexFilter: IIndexFilter) {
        super();
        this.f = indexFilter.f;
        this.p = indexFilter.p;
        this.t = indexFilter.t;
        this.r = indexFilter.r;
    }

    public toObject(): IIndexFilter {
        return {
            f: this.type,
            p: this.param0,
            t: this.param1,
            r: this.reverse,
        };
    }

    get type() {
        return this.f;
    }
    set type(value: IIndexFilter['f']) {
        this.f = value;
    }

    get param0() {
        return this.p;
    }
    set param0(value: IIndexFilter['p']) {
        this.p = value;
    }

    get param1() {
        return this.t;
    }
    set param1(value: IIndexFilter['t']) {
        this.t = value;
    }

    get reverse() {
        return this.r;
    }
    set reverse(value: IIndexFilter['r']) {
        this.r = value;
    }
}
