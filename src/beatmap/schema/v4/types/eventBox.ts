import type { IObject } from './object.ts';
import type { IItem } from './item.ts';

/**
 * Base schema for v4 `Event Box`.
 */
export interface IEventBox extends IItem {
   /**
    * Index of typed event box array.
    *
    * **Type:** `i32`
    */
   e?: number;
   /**
    * Index of index filter array.
    *
    * **Type:** `i32`
    */
   f?: number;
   /**
    * Index array of typed event array.
    *
    * **Type:** `usize[]`
    */
   l?: IObject[];
}
