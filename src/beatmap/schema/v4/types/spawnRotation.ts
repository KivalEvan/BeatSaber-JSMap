import type { ExecutionTime } from '../../shared/types/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Spawn Rotation`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export interface ISpawnRotation extends IItem {
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
