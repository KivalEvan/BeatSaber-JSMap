import type { Axis } from '../shared/constants.ts';
import type { IEventBoxCommon } from './eventBoxCommon.ts';

/**
 * Schema for v4 `Light Rotation Event Box`.
 */
export interface ILightRotationEventBox extends IEventBoxCommon {
   /**
    * Axis of light rotation event box.
    * ```ts
    * 0 -> X
    * 1 -> Y
    * 2 -> Z
    * ```
    *
    * **Type:** {@linkcode Axis}
    */
   a?: Axis;
   /**
    * Flip rotation in light rotation event box.
    *
    * **Type:** `i32`
    */
   f?: 0 | 1;
}
