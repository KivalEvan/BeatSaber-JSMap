import type { EaseType } from '../shared/constants.ts';
import type { LightRotationDirection } from '../shared/constants.ts';
import type { IItem } from './item.ts';

/**
 * Schema for v4 `Light Rotation Event`.
 */
export interface ILightRotationEvent extends IItem {
   /**
    * Use previous event rotation value in light rotation.
    *
    * **Type:** `i32`
    */
   p?: 0 | 1;
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
    * Rotation value of light rotation.
    * ```ts
    * Left-side -> Clockwise
    * Right-side -> Counter-Clockwise
    * ```
    *
    * **Type:** `f32`
    */
   r?: number;
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
   d?: LightRotationDirection;
}
