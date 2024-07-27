import type { IGridObject } from './gridObject.ts';

/**
 * Schema for v3 `Waypoint`.
 */
export interface IWaypoint extends IGridObject {
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
   d?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;
}
