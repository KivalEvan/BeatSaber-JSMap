import type { DistributionType } from '../shared/constants.ts';
import type { IWrapEventBox, IWrapEventBoxAttribute } from './eventBox.ts';
import type { IWrapLightColorEvent, IWrapLightColorEventAttribute } from './lightColorEvent.ts';

/**
 * Wrapper attribute for beatmap light color event box.
 */
export interface IWrapLightColorEventBoxAttribute extends IWrapEventBoxAttribute {
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
   events: IWrapLightColorEventAttribute[];
}

/**
 * Wrapper for beatmap light color event box.
 */
export interface IWrapLightColorEventBox extends IWrapEventBox, IWrapLightColorEventBoxAttribute {
   events: IWrapLightColorEvent[];

   setBrightnessDistribution(
      value: IWrapLightColorEventBox['brightnessDistribution'],
   ): this;
   setBrightnessDistributionType(
      value: IWrapLightColorEventBox['brightnessDistributionType'],
   ): this;
   setAffectFirst(value: IWrapLightColorEventBox['affectFirst']): this;
   setEvents(value: IWrapLightColorEvent[]): this;
}
