import type { IBaseObject } from './baseObject.ts';

/**
 * Schema for v3 `Color Boost Event`.
 */
export interface IColorBoostEvent extends IBaseObject {
   /**
    * Toggle of boost event.
    *
    * **Type:** `bool`
    */
   o?: boolean;
}
