import type { EaseType, LightRotationDirection } from '../../shared/types/constants.ts';
import type { ICustomDataBase } from '../../shared/types/custom/customData.ts';

/**
 * Schema for v3 `Light Rotation Event`.
 */
export interface ILightRotationEvent {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   b?: number;
   /**
    * Ease type of light rotation.
    *
    * **Type:** {@linkcode EaseType}
    */
   e?: EaseType;
   /**
    * Loop count in light rotation.
    *
    * **Type:** `i32`
    */
   l?: number;
   /**
    * Rotation direction of light rotation.
    * ```ts
    * 0 -> Automatic
    * 1 -> Clockwise
    * 2 -> Counter-clockwise
    * ```
    *
    * **Type:** {@linkcode LightRotationDirection}
    */
   o?: LightRotationDirection;
   /**
    * Use previous event rotation value in light rotation.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
   /**
    * Rotation value of light rotation.
    * ```ts
    * Left-side -> Clockwise
    * Right-side -> Counter-Clockwise
    * ```
    *
    * **Type:** `f32`
    */
   r?: number;
   customData?: ICustomDataBase;
}
