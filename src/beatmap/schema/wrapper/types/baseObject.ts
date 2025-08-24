import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap object.
 */
export interface IWrapBaseObject extends IWrapBaseItem {
   /**
    * Beat time of beatmap object.
    *
    * **Type:** `f32`
    */
   time: number;
}
