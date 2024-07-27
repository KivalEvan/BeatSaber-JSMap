import type { IGridObject } from './gridObject.ts';
import type { ICustomDataObstacle } from './custom/obstacle.ts';

/**
 * Schema for v3 `Obstacle`.
 */
export interface IObstacle extends IGridObject {
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
