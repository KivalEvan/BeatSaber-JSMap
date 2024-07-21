import type { DistributionType } from '../shared/constants.ts';
import type { IWrapBasicEventBox, IWrapBasicEventBoxAttribute } from './eventBox.ts';
import type { IWrapFxEventFloat, IWrapFxEventFloatAttribute } from './fxEventFloat.ts';

export interface IWrapFxEventBoxAttribute extends IWrapBasicEventBoxAttribute {
   /** FX distribution `<float>` of FX event box. */
   fxDistribution: number;
   /**
    * FX distribution type `<int>` of FX event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    */
   fxDistributionType: DistributionType;
   /** FX event list. */
   events: IWrapFxEventFloatAttribute[];
}

export interface IWrapFxEventBox extends IWrapBasicEventBox, IWrapFxEventBoxAttribute {
   events: IWrapFxEventFloat[];

   setFxDistribution(value: IWrapFxEventBox['fxDistribution']): this;
   setFxDistributionType(value: IWrapFxEventBox['fxDistributionType']): this;
   setAffectFirst(value: IWrapFxEventBox['affectFirst']): this;
   setEvents(value: IWrapFxEventFloat[]): this;
}
