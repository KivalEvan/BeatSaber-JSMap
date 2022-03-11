import { Serializable } from '../../shared/types/serializable.ts';
import { IIndexFilter, IndexFilter } from './indexFilter.ts';

export interface IEventBox {
    /** Index filter of event box. */
    f: IIndexFilter;
    /** Beat distribution `<float>` of event box. */
    w: number;
    /** Beat distribution type `<int>` of event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    d: 1 | 2;
}

export abstract class EventBox extends Serializable<IEventBox> {
    private f: IndexFilter;
    private w;
    private d;
    constructor(eventBox: IEventBox) {
        super();
        this.f = new IndexFilter(eventBox.f);
        this.w = eventBox.w;
        this.d = eventBox.d;
    }

    /** Index filter of event box. */
    get filter() {
        return this.f;
    }
    set filter(value: IndexFilter) {
        this.f = value;
    }

    /** Beat distribution `<float>` of event box. */
    get beatDistribution() {
        return this.w;
    }
    set beatDistribution(value: IEventBox['w']) {
        this.w = value;
    }

    /** Beat distribution type `<int>` of event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    get beatDistributionType() {
        return this.d;
    }
    set beatDistributionType(value: IEventBox['d']) {
        this.d = value;
    }
}
