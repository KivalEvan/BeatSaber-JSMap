import { IWrapBaseItem } from './baseItem.ts';
import { IWrapIndexFilter } from './indexFilter.ts';

export interface IWrapEventBox extends IWrapBaseItem {
    /** Index filter of event box. */
    filter: IWrapIndexFilter;
    /** Beat distribution `<float>` of event box. */
    beatDistribution: number;
    /** Beat distribution type `<int>` of event box.
     * ```ts
     * 1 -> Wave // adds up to last ID.
     * 2 -> Step // adds to consequent ID.
     * ```
     */
    beatDistributionType: 1 | 2;

    setFilter(value: IWrapIndexFilter): this;
    setBeatDistribution(value: IWrapEventBox['beatDistribution']): this;
    setBeatDistributionType(value: IWrapEventBox['beatDistributionType']): this;
}
