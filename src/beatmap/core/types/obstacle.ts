import type { ICustomDataObstacle } from './custom/obstacle.ts';
import type { IWrapGridObject } from './gridObject.ts';

/**
 * Wrapper attribute for beatmap obstacle.
 */
export interface IWrapObstacle extends IWrapGridObject {
   /**
    * Duration of obstacle.
    *
    * **Type:** `f32`
    */
   duration: number;
   /**
    * Width of obstacle.
    *
    * **Type:** `f32`
    */
   width: number;
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
   height: number;
   customData: ICustomDataObstacle;
}
