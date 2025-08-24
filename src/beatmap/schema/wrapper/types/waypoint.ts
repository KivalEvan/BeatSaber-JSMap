import type { IWrapGridObject } from './gridObject.ts';

/**
 * Wrapper attribute for beatmap waypoint.
 */
export interface IWrapWaypoint extends IWrapGridObject {
   /**
    * Offset direction of waypoint.
    * ```ts
    * 4 | 0 | 5
    * 2 | 8 | 3
    * 6 | 1 | 7
    * ```
    *
    * Grid represents cut direction from center.
    *
    * **Type:** `i32`
    */
   direction: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;
}
