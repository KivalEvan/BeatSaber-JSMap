// deno-lint-ignore-file no-explicit-any
import type { ModType } from '../shared/modCheck.ts';
import type { ICustomDataObstacle } from './custom/obstacle.ts';
import type { IWrapGridObject, IWrapGridObjectAttribute } from './gridObject.ts';

export interface IWrapObstacleAttribute extends IWrapGridObjectAttribute {
   /** Duration `<float>` of obstacle.*/
   duration: number;
   /**
    * Width `<int>` of obstacle.
    *
    * **RANGE:** `none`
    */
   width: number;
   /**
    * Height `<int>` of obstacle.
    * ```ts
    * 1 -> Short
    * 2 -> Moderate
    * 3 -> Crouch
    * 4 -> Tall
    * 5 -> Full
    * ```
    *
    * **RANGE:** `1-5`
    */
   height: number;
   customData: ICustomDataObstacle;
}

export interface IWrapObstacle<
   T extends { [key: string]: any } = IWrapObstacleAttribute,
> extends Omit<IWrapGridObject<T>, 'customData'>, IWrapObstacleAttribute {
   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   setDuration(value: number): this;
   setWidth(value: number): this;
   setHeight(value: number): this;

   /**
    * Check if obstacle is interactive.
    * ```ts
    * if (wall.isInteractive()) {}
    * ```
    */
   isInteractive(type?: ModType): boolean;

   /**
    * Check if current obstacle is longer than previous obstacle.
    * ```ts
    * if (wall.isLonger(compareWall)) {}
    * ```
    */
   isLonger(
      compareTo: IWrapObstacle,
      prevOffset: number,
      type?: ModType,
   ): boolean;

   /**
    * Check if obstacle has zero value.
    * ```ts
    * if (wall.hasZero()) {}
    * ```
    */
   hasZero(): boolean;

   /**
    * Check if obstacle has negative value.
    * ```ts
    * if (wall.hasNegative()) {}
    * ```
    */
   hasNegative(): boolean;
}
