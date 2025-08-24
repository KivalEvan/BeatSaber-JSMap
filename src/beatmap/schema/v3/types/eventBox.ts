import type { EaseType } from '../../shared/types/constants.ts';
import type { DistributionType } from '../../shared/types/constants.ts';
import type { IBaseItem } from './baseItem.ts';
import type { IIndexFilter } from './indexFilter.ts';

/**
 * Schema for v3 `Event Box`.
 */
export interface IEventBox extends IBaseItem {
   /** Index filter of event box. */
   f?: IIndexFilter;
   /**
    * Beat distribution of event box.
    *
    * **Type:** `f32`
    */
   w?: number;
   /**
    * Beat distribution type of event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   d?: DistributionType;
   /**
    * Easing of distribution.
    *
    * **Type:** {@linkcode EaseType}
    */
   i?: EaseType;
}
