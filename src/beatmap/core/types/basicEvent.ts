import type { IWrapBaseObject } from './baseObject.ts';
import type { ICustomDataEvent } from './custom/event.ts';

/**
 * Wrapper attribute for beatmap basic event.
 */
export interface IWrapBasicEvent extends IWrapBaseObject {
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
   type: number;
   /**
    * Value of basic event.
    *
    * **Type:** `i32`
    */
   value: number;
   /**
    * Float value of basic event.
    *
    * **Type:** `f32`
    */
   floatValue: number;
   customData: ICustomDataEvent;
}
