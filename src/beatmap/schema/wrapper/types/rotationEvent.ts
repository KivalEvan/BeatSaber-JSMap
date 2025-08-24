import type { ExecutionTime } from '../../../schema/shared/types/constants.ts';
import type { IWrapBaseObject } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap rotation event.
 */
export interface IWrapRotationEvent extends IWrapBaseObject {
   /**
    * Execution time of rotation event.
    * ```ts
    * 0 -> Early
    * 1 -> Late
    * ```
    *
    * **Type:** {@linkcode ExecutionTime}
    */
   executionTime: ExecutionTime;
   /**
    * Clockwise rotation value of rotation event.
    *
    * **Type:** `f32`
    */
   rotation: number;
}
