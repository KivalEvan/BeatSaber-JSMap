import type { IGrid } from './grid.ts';
import type { ICustomDataObstacle } from '../v3/custom/obstacle.ts';

/**
 * Schema for v4 `Obstacle`.
 */
export interface IObstacle extends IGrid {
   /**
    * Duration of obstacle.
    *
    * **Type:** `f32`
    */
   d?: number;
   /**
    * Width of obstacle.
    *
    * **RANGE:** `none`
    *
    * **Type:** `i32`
    */
   w?: number;
   /**
    * Height of obstacle.
    * ```ts
    * 1 -> Short
    * 2 -> Moderate
    * 3 -> Crouch
    * 4 -> Tall
    * 5 -> Full
    * ```
    *
    * **RANGE:** `1-5`
    *
    * **Type:** `i32`
    */
   h?: number;
   customData?: ICustomDataObstacle;
}
