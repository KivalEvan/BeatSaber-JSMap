import type { DistributionType } from '../shared/constants.ts';
import type { Axis } from '../shared/constants.ts';
import type { IWrapEventBox, IWrapEventBoxAttribute } from './eventBox.ts';
import type {
   IWrapLightRotationEvent,
   IWrapLightRotationEventAttribute,
} from './lightRotationEvent.ts';

/**
 * Wrapper attribute for beatmap light rotation event box.
 */
export interface IWrapLightRotationEventBoxAttribute extends IWrapEventBoxAttribute {
   /**
    * Rotation distribution of light rotation event box.
    *
    * **Type:** `f32`
    */
   rotationDistribution: number;
   /**
    * Rotation distribution type of light rotation event box.
    * ```ts
    * 1 -> Wave // adds up to last ID.
    * 2 -> Step // adds to consequent ID.
    * ```
    *
    * **Type:** {@linkcode DistributionType}
    */
   rotationDistributionType: DistributionType;
   /**
    * Axis of light rotation event box.
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
    * Flip rotation in light rotation event box.
    *
    * **Type:** `i32`
    */
   flip: 0 | 1;
   events: IWrapLightRotationEventAttribute[];
}

/**
 * Wrapper for beatmap light rotation event box.
 */
export interface IWrapLightRotationEventBox
   extends IWrapEventBox, IWrapLightRotationEventBoxAttribute {
   events: IWrapLightRotationEvent[];

   setRotationDistribution(value: IWrapLightRotationEventBox['rotationDistribution']): this;
   setRotationDistributionType(value: IWrapLightRotationEventBox['rotationDistributionType']): this;
   setAxis(value: IWrapLightRotationEventBox['axis']): this;
   setFlip(value: IWrapLightRotationEventBox['flip']): this;
   setAffectFirst(value: IWrapLightRotationEventBox['affectFirst']): this;
   setEvents(value: IWrapLightRotationEvent[]): this;
}
