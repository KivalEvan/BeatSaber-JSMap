import type { IBaseObject } from './baseObject.ts';

/**
 * Schema for v3 `Event Box Group`.
 */
export interface IEventBoxGroup<T> extends IBaseObject {
   /**
    * Group ID of event box group.
    *
    * **Type:** `i32`
    */
   g?: number;
   e?: T[];
}
