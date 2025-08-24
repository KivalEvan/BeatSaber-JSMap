import type { DistributionType } from '../../shared/types/constants.ts';
import type { IEventBox } from './eventBox.ts';

/**
 * Schema for v3 `FX Event Box`.
 */
export interface IFxEventBox extends IEventBox {
   /**
    * FX distribution of FX event box.
    *
    * **Type:** `f32`
    */
   s?: number;
   /**
    * FX distribution type of FX event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   t?: DistributionType;
   /**
    * FX distribution should affect first event of FX event box.
    *
    * **Type:** `i32`
    */
   b?: 0 | 1;
   /**
    * FX index list.
    *
    * **Type:** `usize[]`
    */
   l?: number[];
}
