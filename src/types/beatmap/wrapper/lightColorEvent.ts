import type { EventLightColor } from '../shared/constants.ts';
import type { EaseType } from '../shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap light color event.
 */
export interface IWrapLightColorEventAttribute extends IWrapBaseObjectAttribute {
   /**
    * Relative beat time `<float>` to event box group.
    *
    * **Type:** `f32`
    */
   time: number;
   previous: 0 | 1;
   /**
    * Color of base light color.
    * ```ts
    * -1 -> None
    * 0 -> Red
    * 1 -> Blue
    * 2 -> White
    * ```
    *
    * **Type:** {@linkcode EventLightColor}
    */
   color: EventLightColor;
   /**
    * Frequency of base light color.
    *
    * Blinking frequency in beat time of the event, `0` is static.
    *
    * **Type:** `i32`
    */
   frequency: number;
   /**
    * Brightness of base light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   brightness: number;
   /**
    * Strobe brightness of base light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    *
    * **Type:** `f32`
    */
   strobeBrightness: number;
   /**
    * Strobe fade  of base light color.
    *
    * **Type:** `i32`
    */
   strobeFade: 0 | 1;
   /**
    * Easing of base light color.
    *
    * **Type:** {@linkcode EaseType}
    */
   easing: EaseType;
}

/**
 * Wrapper for beatmap light color event.
 */
export interface IWrapLightColorEvent extends IWrapBaseObject, IWrapLightColorEventAttribute {
   setPrevious(value: 0 | 1): this;
   setColor(value: EventLightColor): this;
   setBrightness(value: number): this;
   setFrequency(value: number): this;
   setStrobeBrightness(value: number): this;
   setStrobeFade(value: 0 | 1): this;
   setEasing(value: EaseType): this;
}
