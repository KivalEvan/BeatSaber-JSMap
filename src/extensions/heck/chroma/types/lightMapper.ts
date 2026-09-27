import type { IChromaEventLight } from '../../../../beatmap/schema/v3/types/custom/chroma.ts';
import type { Easings } from '../../../../types/easings.ts';

export type DistributionType = 'Division' | 'Step and Offset';

export interface IIndexFilterBase {
   type: DistributionType;
   reverse: boolean;
}

export interface IIndexFilterDivision extends IIndexFilterBase {
   type: 'Division';
   divide: number;
   id: number;
}

export interface IIndexFilterStep extends IIndexFilterBase {
   type: 'Step and Offset';
   id: number;
   step: number;
}

export type IndexFilter = IIndexFilterDivision | IIndexFilterStep;

export interface IEventBase {
   time: number;
   /**
    * Color `<int>` of event.
    * ```ts
    * 0 -> Red
    * 1 -> Blue
    * 2 -> White
    * ```
    */
   color: 0 | 1 | 2;
   /**
    * Transition type `<int>` of event.
    * ```ts
    * 0 -> Instant
    * 1 -> Interpolate
    * 2 -> Extend
    * 3 -> Flash
    * 4 -> Fade
    * ```
    */
   transition: 0 | 1 | 2 | 3 | 4;
   brightness: number;
   frequency: number;
   customData: IChromaEventLight;
}

export interface IEventBox {
   indexFilter: IndexFilter;
   beatDistribution: number;
   beatDistributionType: DistributionType;
   beatDistributionEasing: Easings;
   brightnessDistribution: number;
   brightnessDistributionType: DistributionType;
   brightnessDistributionEasing: Easings;
   hueDistribution: number;
   hueDistributionType: DistributionType;
   hueDistributionEasing: Easings;
   affectFirst: boolean;
   events: IEventBase[];
}

export interface IEventBoxType {
   time: number;
   type: number;
   lightID: number[];
   eventBox: IEventBox[];
}

/** @deprecated Use {@link IIndexFilterBase} instead. */
export type IndexFilterBase = IIndexFilterBase;

/** @deprecated Use {@link IIndexFilterDivision} instead. */
export type IndexFilterDivision = IIndexFilterDivision;

/** @deprecated Use {@link IIndexFilterStep} instead. */
export type IndexFilterStep = IIndexFilterStep;

/** @deprecated Use {@link IEventBase} instead. */
export type EventBase = IEventBase;

/** @deprecated Use {@link IEventBox} instead. */
export type EventBox = IEventBox;

/** @deprecated Use {@link IEventBoxType} instead. */
export type EventBoxType = IEventBoxType;
