// deno-lint-ignore-file no-explicit-any
import type { DistributionType } from '../shared/constants.ts';
import type { IWrapEventBox, IWrapEventBoxAttribute } from './eventBox.ts';
import type { IWrapFxEventFloat, IWrapFxEventFloatAttribute } from './fxEventFloat.ts';

export interface IWrapFxEventBoxAttribute extends IWrapEventBoxAttribute {
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

export interface IWrapFxEventBox<
   T extends { [key: string]: any } = IWrapFxEventBoxAttribute,
> extends IWrapEventBox<T>, IWrapFxEventBoxAttribute {
   events: IWrapFxEventFloat[];

   setFxDistribution(value: IWrapFxEventBox['fxDistribution']): this;
   setFxDistributionType(value: IWrapFxEventBox['fxDistributionType']): this;
   setAffectFirst(value: IWrapFxEventBox['affectFirst']): this;
   setEvents(value: IWrapFxEventFloat[]): this;
}
