import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap grid object.
 */
export interface IWrapGridObject extends IWrapBaseObject {
   /**
    * Position X of base object.
    * ```ts
    * 0 -> Outer Left
    * 1 -> Middle Left
    * 2 -> Middle Right
    * 3 -> Outer Right
    * ```
    *
    * **RANGE:** `0-3`
    *
    * **Type:** `i32`
    */
   posX: number;
   /**
    * Position Y of base object.
    * ```ts
    * 0 -> Bottom row
    * 1 -> Middle row
    * 2 -> Top row
    * ```
    *
    * **RANGE:** `0-2`
    *
    * **Type:** `i32`
    */
   posY: number;
   /**
    * Lane rotation of base object.
    *
    * **Type:** `f32`
    */
   laneRotation: number;
}
