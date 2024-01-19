import { IItem } from './item.ts';

export interface ILightColorEvent extends IItem {
   /** Use previous event value `<int>` of light color. */
   p?: 0 | 1;
   /**
    * Color `<int>` of light color.
    * ```ts
    * -1 -> None
    * 0 -> Red
    * 1 -> Blue
    * 2 -> White
    * ```
    */
   c?: -1 | 0 | 1 | 2;
   /** Easing type `<int>` of light color. */
   e?: number;
   /**
    * Brightness `<float>` of light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    */
   b?: number;
   /**
    * Frequency `<int>` of light color.
    *
    * Blinking frequency in beat time of the event, `0` is static.
    */
   f?: number;
   /**
    * Strobe brightness `<float>` of light color.
    *
    * Percentage value `0-1` (0% to 100%), can be more than 1.
    */
   sb?: number;
   /** Strobe  fade `<int>` of light color. */
   sf?: 0 | 1;
}
