import type { ExecutionTime } from '../shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

/**
 * Wrapper attribute for beatmap rotation event.
 */
export interface IWrapRotationEventAttribute extends IWrapBaseObjectAttribute {
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

/**
 * Wrapper interface for beatmap rotation event.
 */
export interface IWrapRotationEvent extends IWrapBaseObject, IWrapRotationEventAttribute {
   setExecutionTime(value: ExecutionTime): this;
   setRotation(value: number): this;
}
