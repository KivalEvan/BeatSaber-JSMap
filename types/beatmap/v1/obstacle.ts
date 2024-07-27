import type { IBaseObject } from './object.ts';

/**
 * Schema for v1 `Obstacle`.
 */
export interface IObstacle extends IBaseObject {
   /**
    * Obstacle placement on column.
    * ```ts
    * 0 -> Outer Left
    * 1 -> Middle Left
    * 2 -> Middle Right
    * 3 -> Outer Right
    * ```
    *
    * **Type:** `i32`
    */
   _lineIndex: number;
   /**
    * Type of obstacle.
    * ```ts
    * 0 -> Full-height Wall
    * 1 -> Crouch Wall
    * 2 -> Freeform Wall
    * ```
    *
    * **Type:** `i32`
    */
   _type: number;
   /**
    * Duration of obstacle.
    *
    * **Type:** `f32`
    */
   _duration: number;
   /**
    * Width of obstacle.
    *
    * **Type:** `i32`
    */
   _width: number;
}
