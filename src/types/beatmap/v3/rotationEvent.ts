import type { ExecutionTime } from '../shared/constants.ts';
import type { IBaseObject } from './baseObject.ts';

/**
 * Schema for v3 `Rotation Event`.
 */
export interface IRotationEvent extends IBaseObject {
   /**
    * Execution time of rotation event.
    * ```ts
    * 0 -> Early
    * 1 -> Late
    * ```
    *
    * **Type:** {@linkcode ExecutionTime}
    */
   e?: ExecutionTime;
   /**
    * Clockwise rotation value of rotation event.
    *
    * **Type:** `f32`
    */
   r?: number;
}
