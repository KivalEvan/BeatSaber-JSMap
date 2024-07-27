import type { DistributionType } from '../shared/constants.ts';
import type { EaseType } from '../shared/constants.ts';
import type { IItem } from './item.ts';

/**
 * Base schema for v4 `Event Box`.
 */
export interface IEventBoxCommon extends IItem {
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
    * Distribution of event box.
    *
    * **Type:** `f32`
    */
   s?: number;
   /**
    * Distribution type of event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   t?: DistributionType;
   /**
    * Distribution should affect first event `<int>` of event box.
    *
    * **Type:** `i32`
    */
   b?: 0 | 1;
   /**
    * Easing `<int>` of distribution.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
}
