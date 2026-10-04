import type { ExecutionTime } from '../../shared/types/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for unsupported legacy v4 `Spawn Rotation` data.
 *
 * Do not add this data to v4 beatmaps. Use per-object lane rotations instead.
 *
 * @deprecated Kept only for optional cleanup of legacy data.
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
   t?: ExecutionTime;
   /**
    * Clockwise rotation value of rotation event.
    *
    * **Type:** `f32`
    */
   r?: number;
}
