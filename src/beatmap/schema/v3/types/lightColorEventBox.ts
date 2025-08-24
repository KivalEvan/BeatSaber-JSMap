import type { DistributionType } from '../../shared/types/constants.ts';
import type { IEventBox } from './eventBox.ts';
import type { ILightColorEvent } from './lightColorEvent.ts';

/**
 * Schema for v3 `Light Color Event Box`.
 */
export interface ILightColorEventBox extends IEventBox {
   /**
    * Brightness distribution of light color event box.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   r?: number;
   /**
    * Brightness distribution type of light color event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   t?: DistributionType;
   /**
    * Brightness distribution should affect first event of light color event box.
    *
    * **Type:** `i32`
    */
   b?: 0 | 1;
   /** Light color base data list. */
   e?: ILightColorEvent[];
}
