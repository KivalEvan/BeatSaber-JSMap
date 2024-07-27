import type { IBaseObject } from './baseObject.ts';

/**
 * Schema for v3 `BPM Event`.
 */
export interface IBPMEvent extends IBaseObject {
   /**
    * Value of BPM change event.
    *
    * **Type:** `f32`
    */
   m?: number;
}
