import type { EaseType } from '../shared/constants.ts';
import type { DistributionType } from '../shared/constants.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';
import type { IWrapIndexFilter, IWrapIndexFilterAttribute } from './indexFilter.ts';

export interface IWrapBasicEventBoxAttribute extends IWrapBaseItemAttribute {
   /** Index filter of event box. */
   filter: IWrapIndexFilterAttribute;
   /** Beat distribution `<float>` of event box. */
   beatDistribution: number;
   /**
    * Beat distribution type `<int>` of event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    */
   beatDistributionType: DistributionType;
   /** Easing `<int>` of distribution. */
   easing: EaseType;
   /** Event distribution should affect first event `<int>` of event box. */
   affectFirst: 0 | 1;
   events: IWrapBaseObjectAttribute[];
}

export interface IWrapBasicEventBox extends IWrapBaseItem, IWrapBasicEventBoxAttribute {
   events: IWrapBaseObject[];

   setFilter(value: IWrapIndexFilter): this;
   setBeatDistribution(value: IWrapBasicEventBox['beatDistribution']): this;
   setBeatDistributionType(value: IWrapBasicEventBox['beatDistributionType']): this;
   setEasing(value: IWrapBasicEventBox['easing']): this;
   setEvents(value: number[] | IWrapBaseObject[]): this;
}
