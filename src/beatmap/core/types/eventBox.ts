import type { EaseType } from '../../schema/shared/types/constants.ts';
import type { DistributionType } from '../../schema/shared/types/constants.ts';
import type { IWrapBaseItem } from './baseItem.ts';
import type { IWrapBaseObject } from './baseObject.ts';
import type { IWrapIndexFilter } from './indexFilter.ts';

/**
 * Wrapper attribute for beatmap event box.
 */
export interface IWrapEventBox extends IWrapBaseItem {
   /** Index filter of event box. */
   filter: IWrapIndexFilter;
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
   events: IWrapBaseObject[];
}
