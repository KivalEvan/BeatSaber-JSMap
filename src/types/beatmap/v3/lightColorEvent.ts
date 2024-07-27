import type { TransitionType } from '../shared/constants.ts';
import type { EventLightColor } from '../shared/constants.ts';
import type { ICustomDataBase } from '../shared/custom/customData.ts';

/**
 * Schema for v3 `Light Color Event`.
 */
export interface ILightColorEvent {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   b?: number;
   /**
    * Color of base light color.
    * ```ts
    * -1 -> None
    * 0 -> Red
    * 1 -> Blue
    * 2 -> White
    * ```
    *
    * **Type:** `i32`
    */
   c?: EventLightColor;
   /**
    * Frequency of base light color.
    *
    * Blinking frequency in beat time of the event, `0` is static.
    *
    * **Type:** `i32`
    */
   f?: number;
   /**
    * Transition type of base light color.
    * ```ts
    * 0 -> Instant
    * 1 -> Interpolate
    * 2 -> Extend
    * ```
    *
    * **Type:** `i32`
    */
   i?: TransitionType;
   /**
    * Brightness of base light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   s?: number;
   /**
    * Strobe brightness of base light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   sb?: number;
   /**
    * Strobe fade of base light color.
    *
    * **Type:** `i32`
    */
   sf?: 0 | 1;
   customData?: ICustomDataBase;
}
