import type { IBaseObject } from './object.ts';

/**
 * Schema for v1 `Event`.
 */
export interface IEvent extends IBaseObject {
   /**
    * Type of event.
    *
    * **Type:** `i32`
    */
   _type: number;
   /**
    * Value of event.
    *
    * **Type:** `i32`
    */
   _value: number;
}
