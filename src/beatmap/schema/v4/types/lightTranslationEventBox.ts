import type { Axis } from '../../shared/types/constants.ts';
import type { IEventBoxCommon } from './eventBoxCommon.ts';

/**
 * Schema for v4 `Light Translation Event Box`.
 */
export interface ILightTranslationEventBox extends IEventBoxCommon {
   /**
    * Axis of light translation event box.
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
    * Flip translation in light translation event box.
    *
    * **Type:** `i32`
    */
   f?: 0 | 1;
}
