import type { EventLightColor } from '../shared/constants.ts';
import type { EaseType } from '../shared/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Light Color Event`.
 */
export interface ILightColorEvent extends IItem {
   /**
    * Use previous event value of light color.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Color of light color.
    * ```ts
    * -1 -> None
    * 0 -> Red
    * 1 -> Blue
    * 2 -> White
    * ```
    *
    * **Type:** {@linkcode EventLightColor}
    */
   c?: EventLightColor;
   /**
    * Easing type of light color.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
   /**
    * Brightness `<float>` of light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   b?: number;
   /**
    * Frequency `<int>` of light color.
    *
    * Blinking frequency in beat time of the event, `0` is static.
    *
    * **Type:** `i32`
    */
   f?: number;
   /**
    * Strobe brightness `<float>` of light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   sb?: number;
   /**
    * Strobe  fade `<int>` of light color.
    *
    * **Type:** `i32`
    */
   sf?: 0 | 1;
}
