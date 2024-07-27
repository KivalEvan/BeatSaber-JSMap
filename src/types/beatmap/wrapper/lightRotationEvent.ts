import type { EaseType } from '../shared/constants.ts';
import type { LightRotationDirection } from '../shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapLightRotationEventAttribute extends IWrapBaseObjectAttribute {
   /**
    * Relative beat time to event box group.
    *
    * **Type:** `f32`
    */
   time: number;
   /**
    * Ease type of light rotation.
    *
    * **Type:** {@linkcode EaseType}
    */
   easing: EaseType;
   /**
    * Loop count in light rotation.
    *
    * **Type:** `i32`
    */
   loop: number;
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
   direction: LightRotationDirection;
   /**
    * Use previous event rotation value in light rotation.
    *
    * **Type:** `i32`
    */
   previous: 0 | 1;
   /**
    * Rotation value of light rotation.
    * ```ts
    * Left-side -> Clockwise
    * Right-side -> Counter-Clockwise
    * ```
    *
    * **Type:** `f32`
    */
   rotation: number;
}

/**
 * Wrapper for beatmap light rotation event.
 */
export interface IWrapLightRotationEvent extends IWrapBaseObject, IWrapLightRotationEventAttribute {
   setPrevious(value: 0 | 1): this;
   setEasing(value: EaseType): this;
   setLoop(value: number): this;
   setRotation(value: number): this;
   setDirection(value: LightRotationDirection): this;
}
