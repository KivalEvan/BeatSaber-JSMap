import type { Axis } from '../../../schema/shared/types/constants.ts';
import type { DistributionType } from '../../../schema/shared/types/constants.ts';
import type { IWrapEventBox } from './eventBox.ts';
import type { IWrapLightTranslationEvent } from './lightTranslationEvent.ts';

/**
 * Wrapper attribute for beatmap light translation event box.
 */
export interface IWrapLightTranslationEventBox extends IWrapEventBox {
   /**
    * Translation distribution of light translation event box.
    *
    * **Type:** `f32`
    */
   gapDistribution: number;
   /**
    * Translation distribution type of light translation event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   gapDistributionType: DistributionType;
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
   axis: Axis;
   /**
    * Flip translation in light translation event box.
    *
    * **Type:** `i32`
    */
   flip: 0 | 1;
   events: IWrapLightTranslationEvent[];
}
