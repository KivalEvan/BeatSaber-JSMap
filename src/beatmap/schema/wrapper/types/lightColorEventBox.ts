import type { DistributionType } from '../../../schema/shared/types/constants.ts';
import type { IWrapEventBox } from './eventBox.ts';
import type { IWrapLightColorEvent } from './lightColorEvent.ts';

/**
 * Wrapper attribute for beatmap light color event box.
 */
export interface IWrapLightColorEventBox extends IWrapEventBox {
   /**
    * Brightness distribution of light color event box.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   brightnessDistribution: number;
   /**
    * Brightness distribution type of light color event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   brightnessDistributionType: DistributionType;
   events: IWrapLightColorEvent[];
}
