import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap object.
 */
export interface IWrapBaseObjectAttribute extends IWrapBaseItemAttribute {
   /**
    * Beat time of beatmap object.
    *
    * **Type:** `f32`
    */
   time: number;
}

/**
 * Wrapper for beatmap object.
 */
export interface IWrapBaseObject extends IWrapBaseItem, IWrapBaseObjectAttribute {
   setTime(value: number): this;
}
