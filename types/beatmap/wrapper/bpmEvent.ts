import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap BPM event.
 */
export interface IWrapBPMEventAttribute extends IWrapBaseObjectAttribute {
   /**
    * Value of BPM change event.
    *
    * **Type:** `f32`
    */
   bpm: number;
}

/**
 * Wrapper for beatmap BPM event.
 */
export interface IWrapBPMEvent extends IWrapBaseObject, IWrapBPMEventAttribute {
   setBPM(value: number): this;
}
