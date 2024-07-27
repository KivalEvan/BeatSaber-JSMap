import type { EaseType } from '../shared/constants.ts';
import type { DistributionType } from '../shared/constants.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';
import type { IWrapIndexFilter, IWrapIndexFilterAttribute } from './indexFilter.ts';

/**
 * Wrapper attribute for beatmap event box.
 */
export interface IWrapEventBoxAttribute extends IWrapBaseItemAttribute {
   /** Index filter of event box. */
   filter: IWrapIndexFilterAttribute;
   /**
    * Beat distribution of event box.
    *
    * **Type:** `f32`
    */
   beatDistribution: number;
   /**
    * Beat distribution type of event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   beatDistributionType: DistributionType;
   /**
    * Easing of distribution.
    *
    * **Type:** {@linkcode EaseType}
    */
   easing: EaseType;
   /**
    * Event distribution should affect first event of event box.
    *
    * **Type:** `i32`
    */
   affectFirst: 0 | 1;
   events: IWrapBaseObjectAttribute[];
}

/**
 * Wrapper for beatmap event box.
 */
export interface IWrapEventBox extends IWrapBaseItem, IWrapEventBoxAttribute {
   events: IWrapBaseObject[];

   setFilter(value: IWrapIndexFilter): this;
   setBeatDistribution(value: IWrapEventBox['beatDistribution']): this;
   setBeatDistributionType(value: IWrapEventBox['beatDistributionType']): this;
   setEasing(value: IWrapEventBox['easing']): this;
   setEvents(value: number[] | IWrapBaseObject[]): this;
}
