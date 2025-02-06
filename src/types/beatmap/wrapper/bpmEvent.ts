import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap BPM event.
 */
export interface IWrapBPMEvent extends IWrapBaseObject {
   /**
    * Value of BPM change event.
    *
    * **Type:** `f32`
    */
   bpm: number;
}
