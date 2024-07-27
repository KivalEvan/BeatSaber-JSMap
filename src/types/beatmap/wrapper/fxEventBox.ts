import type { DistributionType } from '../shared/constants.ts';
import type { IWrapEventBox, IWrapEventBoxAttribute } from './eventBox.ts';
import type { IWrapFxEventFloat, IWrapFxEventFloatAttribute } from './fxEventFloat.ts';

/**
 * Wrapper attribute for beatmap FX event box.
 */
export interface IWrapFxEventBoxAttribute extends IWrapEventBoxAttribute {
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
   events: IWrapFxEventFloatAttribute[];
}

/**
 * Wrapper for beatmap FX event box.
 */
export interface IWrapFxEventBox extends IWrapEventBox, IWrapFxEventBoxAttribute {
   events: IWrapFxEventFloat[];

   setFxDistribution(value: IWrapFxEventBox['fxDistribution']): this;
   setFxDistributionType(value: IWrapFxEventBox['fxDistributionType']): this;
   setAffectFirst(value: IWrapFxEventBox['affectFirst']): this;
   setEvents(value: IWrapFxEventFloat[]): this;
}
