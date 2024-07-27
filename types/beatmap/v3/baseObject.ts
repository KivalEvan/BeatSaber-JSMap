import type { IBaseItem } from './baseItem.ts';

/**
 * Base schema for v3 `Object`.
 */
export interface IBaseObject extends IBaseItem {
   /**
    * Beat time of beatmap object.
    *
    * **Type:** `f32`
    */
   b?: number;
}
