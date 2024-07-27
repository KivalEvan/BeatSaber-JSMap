import type { IBaseObject } from './object.ts';

/**
 * Schema for v2 `Waypoint`.
 */
export interface IWaypoint extends IBaseObject {
   /**
    * Line index of waypoint.
    *
    * **Type:** `i32`
    */
   _lineIndex?: number;
   /**
    * Line layer of waypoint.
    *
    * **Type:** `i32`
    */
   _lineLayer?: number;
   /**
    * Offset direction of waypoint.
    *
    * **Type:** `i32`
    */
   _offsetDirection?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;
}
