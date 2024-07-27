import type { IBaseObject } from './baseObject.ts';
import type { IChromaEventLaser, IChromaEventLight, IChromaEventRing } from './custom/chroma.ts';
import type { ICustomDataBase } from '../shared/custom/customData.ts';

/**
 * Base schema for v3 `Basic Event`.
 */
export interface IBasicEventBase extends IBaseObject {
   /**
    * Event type of basic event.
    * ```ts
    * 0 -> Back Lasers
    * 1 -> Ring Lights
    * 2 -> Left Lasers
    * 3 -> Right Lasers
    * 4 -> Center Lights
    * 5 -> Light Boost
    * 6 -> Extra Left Lights
    * 7 -> Extra Right Lights
    * 8 -> Ring Rotation
    * 9 -> Ring Zoom
    * 10 -> Extra Left Lasers
    * 11 -> Extra Right Lasers
    * 12 -> Left Laser Rotation
    * 13 -> Right Laser Rotation
    * 14 -> Early Lane Rotation
    * 15 -> Late Lane Rotation
    * 16 -> Utility Event 0
    * 17 -> Utility Event 1
    * 18 -> Utility Event 2
    * 19 -> Utility Event 3
    * 40 -> Special Event 0
    * 41 -> Special Event 1
    * 42 -> Special Event 2
    * 43 -> Special Event 3
    * 100 -> BPM Change
    * ```
    *
    * **Type:** `i32`
    */
   et?: number;
   /**
    * Value of basic event.
    *
    * **Type:** `i32`
    */
   i?: number;
   /**
    * Float value of basic event.
    *
    * **Type:** `f32`
    */
   f?: number;
   customData?: ICustomDataBase;
}

/**
 * Generic schema for v3 `Basic Event`.
 */
export interface IBasicEventGeneric extends IBasicEventBase {
   et?: number;
}

/**
 * Light schema for v3 `Basic Event`.
 */
export interface IBasicEventLight extends IBasicEventBase {
   et?: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 10 | 11;
   /**
    * State of light event. ( Blue | Red | White )
    * ```ts
    * 0 -> Off
    * 1 | 5 | 9 -> On
    * 2 | 6 | 10 -> Flash
    * 3 | 7 | 11 -> Fade
    * 4 | 8 | 12 -> Transition
    * ```
    *
    * **Type:** `i32`
    */
   i?: number;
   /**
    * Controls the brightness of the light.
    *
    * **RANGE:** `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   f?: number;
   customData?: IChromaEventLight;
}

/**
 * Boost schema for v3 `Basic Event`.
 *
 * @deprecated use `colorBoostEvents` to apply boost event.
 */
export interface IBasicEventBoost extends IBasicEventBase {
   /**
    * **Type:** `i32`
    *
    * @deprecated use `colorBoostEvents` to apply boost event.
    */
   et?: 5;
   /**
    * **Type:** `i32`
    *
    * @deprecated use `colorBoostEvents` to apply boost event.
    */
   i?: 0 | 1;
}

/**
 * Ring schema for v3 `Basic Event`.
 */
export interface IBasicEventRing extends IBasicEventBase {
   et?: 8 | 9;
   customData?: IChromaEventRing;
}

/**
 * Laser schema for v3 `Basic Event`.
 */
export interface IBasicEventLaserRotation extends IBasicEventBase {
   et?: 12 | 13;
   /**
    * Laser rotation speed in degree per second multiplied by 20.
    *
    * **Type:** `i32`
    */
   i?: number;
   customData?: IChromaEventLaser;
}

/**
 * Lane schema for v3 `Basic Event`.
 *
 * @deprecated use `rotationEvents` to apply lane rotation event.
 */
export interface IBasicEventLaneRotation extends IBasicEventBase {
   /**
    * **Type:** `i32`
    *
    * @deprecated use `rotationEvents` to apply lane rotation event.
    */
   et?: 14 | 15;
   /**
    * Amount of angle changed clockwise.
    * ```ts
    * 0 -> -60 Degree
    * 1 -> -45 Degree
    * 2 -> -30 Degree
    * 3 -> -15 Degree
    * 4 -> 15 Degree
    * 5 -> 30 Degree
    * 6 -> 45 Degree
    * 7 -> 60 Degree
    * ```
    *
    * **Type:** `i32`
    *
    * @deprecated use `rotationEvents` to apply lane rotation event.
    */
   i?: number;
}

/**
 * Extra schema for v3 `Basic Event`.
 */
export interface IBasicEventExtra extends IBasicEventBase {
   et?: 16 | 17 | 18 | 19;
}

/**
 * Special schema for v3 `Basic Event`.
 */
export interface IBasicEventSpecial extends IBasicEventBase {
   et?: 40 | 41 | 42 | 43;
}

/**
 * BPM schema for v3 `Basic Event`.
 *
 * @deprecated use `bpmEvents` to apply BPM change.
 */
export interface IBasicEventBPMChange extends IBasicEventBase {
   et?: 100;
   /**
    * Changes the BPM to event value.
    *
    * **Type:** `f32`
    *
    * @deprecated use `bpmEvents` to apply BPM change.
    */
   f?: number;
}

/**
 * Schema for v3 `Basic Event`.
 */
export type IBasicEvent =
   | IBasicEventGeneric
   | IBasicEventLight
   | IBasicEventBoost
   | IBasicEventRing
   | IBasicEventLaserRotation
   | IBasicEventLaneRotation
   | IBasicEventExtra
   | IBasicEventSpecial
   | IBasicEventBPMChange;
