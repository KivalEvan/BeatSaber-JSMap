import type { DistributionType } from '../../../schema/shared/types/constants.ts';
import type { IWrapEventBox } from './eventBox.ts';
import type { IWrapFxEventFloat } from './fxEventFloat.ts';

/**
 * Wrapper attribute for beatmap FX event box.
 */
export interface IWrapFxEventBox extends IWrapEventBox {
   /**
    * FX distribution of FX event box.
    *
    * **Type:** `f32`
    */
   fxDistribution: number;
   /**
    * FX distribution type `<int>` of FX event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   fxDistributionType: DistributionType;
   /** FX event list. */
   events: IWrapFxEventFloat[];
}
