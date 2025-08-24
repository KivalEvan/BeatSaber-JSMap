import type { DistributionType } from '../../shared/types/constants.ts';
import type { Axis } from '../../shared/types/constants.ts';
import type { IEventBox } from './eventBox.ts';
import type { ILightTranslationEvent } from './lightTranslationEvent.ts';

/**
 * Schema for v3 `Light Translation Event Box`.
 */
export interface ILightTranslationEventBox extends IEventBox {
   /**
    * Translation distribution of light translation event box.
    *
    * **Type:** `f32`
    */
   s?: number;
   /**
    * Translation distribution type of light translation event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   t?: DistributionType;
   /**
    * Axis of light translation event box.
    * ```ts
    * 0 -> X
    * 1 -> Y
    * 2 -> Z
    * ```
    *
    * **Type:** {@linkcode Axis}
    */
   a?: Axis;
   /**
    * Flip translation in light translation event box.
    *
    * **Type:** `i32`
    */
   r?: 0 | 1;
   /**
    * Translation distribution should affect first event of light translation event box.
    *
    * **Type:** `i32`
    */
   b?: 0 | 1;
   /**
    * Light translation base data list.
    */
   l?: ILightTranslationEvent[];
}
