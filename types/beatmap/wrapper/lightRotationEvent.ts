// deno-lint-ignore-file no-explicit-any
import { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapLightRotationEventAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseObjectAttribute<T> {
   /** Relative beat time `<float>` to event box group. */
   time: number;
   /** Ease type `<int>` of light rotation. */
   easing: number;
   /** Loop count `<int>` in light rotation. */
   loop: number;
   /**
    * Rotation direction `<int>` of light rotation.
    * ```ts
    * 0 -> Automatic
    * 1 -> Clockwise
    * 2 -> Counter-clockwise
    * ```
    */
   direction: 0 | 1 | 2;
   /** Use previous event rotation value `<int>` in light rotation. */
   previous: 0 | 1;
   /**
    * Rotation value `<float>` of light rotation.
    * ```ts
    * Left-side -> Clockwise
    * Right-side -> Counter-Clockwise
    * ```
    */
   rotation: number;
}

export interface IWrapLightRotationEvent<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseObject<T>, IWrapLightRotationEventAttribute<T> {
   setPrevious(value: 0 | 1): this;
   setEasing(value: number): this;
   setLoop(value: number): this;
   setRotation(value: number): this;
   setDirection(value: 0 | 1 | 2): this;
}
