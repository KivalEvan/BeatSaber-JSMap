import type {
   IChromaEventLaser,
   IChromaEventLight,
   IChromaEventRing,
   IChromaEventZoom,
} from './custom/chroma.ts';
import type { ICustomDataBase } from '../shared/custom/customData.ts';
import type { INEEvent } from './custom/noodleExtensions.ts';
import type { IBaseObject } from './object.ts';

// it took me long enough to realise Event is a built in JS class/interface, but it has no effect here anyway
/**
 * Base schema for v2 `Event`.
 */
export interface IEventBase extends IBaseObject {
   /**
    * Type of event.
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
   _type?: number;
   /**
    * Value of event.
    *
    * **Type:** `i32`
    */
   _value?: number;
   /**
    * Value of float event.
    *
    * **Type:** `f32`
    */
   _floatValue?: number;
   _customData?: ICustomDataBase;
}

/**
 * Light schema for v2 `Event`.
 */
export interface IEventLight extends IEventBase {
   _type?: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 10 | 11;
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
   _value?: number;
   /**
    * Controls the brightness of the light.
    * ```ts
    * **RANGE:** 0-1 // (0% to 100%), can be more than 1.
    * ```
    *
    * **Type:** `f32`
    */
   _floatValue?: number;
   _customData?: IChromaEventLight;
}

/**
 * Generic schema for v2 `Event`.
 */
export interface IEventGeneric extends IEventBase {
   _type?: number;
}

/**
 * Boost schema for v2 `Event`.
 */
export interface IEventBoost extends IEventBase {
   _type?: 5;
   /**
    * Toggle between boost event.
    *
    * **Type:** `i32`
    */
   _value?: 0 | 1;
}

/**
 * Ring schema for v2 `Event`.
 */
export interface IEventRing extends IEventBase {
   _type?: 8;
   _customData?: IChromaEventRing;
}

/**
 * Zoom schema for v2 `Event`.
 */
export interface IEventZoom extends IEventBase {
   _type?: 9;
   _customData?: IChromaEventRing & IChromaEventZoom;
}

/**
 * Laser schema for v2 `Event`.
 */
export interface IEventLaser extends IEventBase {
   _type?: 12 | 13;
   /**
    * Laser rotation speed in degree per second multiplied by 20.
    *
    * **Type:** `i32`
    */
   _value?: number;
   _customData?: IChromaEventLaser;
}

/**
 * Lane schema for v2 `Event`.
 */
export interface IEventLaneRotation extends IEventBase {
   _type?: 14 | 15;
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
    */
   _value?: number;
   _customData?: INEEvent;
}

/**
 * Extra schema for v2 `Event`.
 */
export interface IEventExtra extends IEventBase {
   _type?: 16 | 17 | 18 | 19;
}

/**
 * Special schema for v2 `Event`.
 */
export interface IEventSpecial extends IEventBase {
   _type?: 40 | 41 | 42 | 43;
}

/**
 * BPM Change schema for v2 `Event`.
 */
export interface IEventBPMChange extends IEventBase {
   _type?: 100;
   /**
    * Changes the BPM to this value.
    *
    * **Type:** `f32`
    */
   _floatValue?: number;
}

/**
 * Schema for v2 `Event`.
 */
export type IEvent =
   | IEventGeneric
   | IEventLight
   | IEventBoost
   | IEventRing
   | IEventZoom
   | IEventLaser
   | IEventLaneRotation
   | IEventExtra
   | IEventSpecial
   | IEventBPMChange;
