// deno-lint-ignore-file no-explicit-any
import type { ExecutionTime } from '../shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapRotationEventAttribute extends IWrapBaseObjectAttribute {
   /**
    * Execution time `<int>` of rotation event.
    * ```ts
    * 0 -> Early
    * 1 -> Late
    * ```
    */
   executionTime: ExecutionTime;
   /** Clockwise rotation value `<float>` of rotation event. */
   rotation: number;
}

export interface IWrapRotationEvent<T extends { [key: string]: any } = IWrapRotationEventAttribute>
   extends IWrapBaseObject<T>, IWrapRotationEventAttribute {
   setExecutionTime(value: ExecutionTime): this;
   setRotation(value: number): this;
}
