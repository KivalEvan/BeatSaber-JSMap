import type { GetPositionFn, MirrorFn } from '../../schema/shared/types/functions.ts';
import type { IWrapGridObject } from '../../core/types/gridObject.ts';
import type { Vector2 } from '../../../types/vector.ts';
import { vectorAdd } from '../../../utils/math/vector.ts';
import {
   isAdjacent,
   isDiagonal,
   isHorizontal,
   isInline,
   isSlantedWindow,
   isVertical,
   isWindow,
   mirrorCoordinate,
   resolveGridDistance,
   resolveGridPosition,
} from '../../helpers/core/gridObject.ts';
import { LINE_COUNT } from '../../misc/remaps.ts';
import { BaseObject } from './baseObject.ts';

/**
 * Base grid beatmap object.
 *
 * This appear within beatmap lane.
 *
 * @abstract
 */
export abstract class GridObject extends BaseObject implements IWrapGridObject {
   posX: IWrapGridObject['posX'] = 0;
   posY: IWrapGridObject['posY'] = 0;
   laneRotation: IWrapGridObject['laneRotation'] = 0;

   setPosX(value: this['posX']): this {
      this.posX = value;
      return this;
   }
   setPosY(value: this['posY']): this {
      this.posY = value;
      return this;
   }
   setLaneRotation(value: this['laneRotation']): this {
      this.laneRotation = value;
      return this;
   }

   /**
    * Mirror a grid object, apply alternative flip and Noodle Extensions if available.
    * ```ts
    * obj.mirror(false, optionalFn);
    * ```
    *
    * Alternative flip is true by default. This implementation is typically used to flip color of note.
    */
   mirror(_flipAlt?: boolean, fn?: MirrorFn<this>): this {
      fn?.(this);
      this.posX = mirrorCoordinate(this.posX, LINE_COUNT);
      return this;
   }

   /**
    * Get object position and return the Beatwalls' position x and y value in tuple.
    * ```ts
    * const objPos = obj.getPosition(optionalFn);
    * ```
    */
   getPosition(fn?: GetPositionFn<this>): Vector2 {
      return fn?.(this) ?? vectorAdd(resolveGridPosition(this), [-2]);
   }

   /**
    * Get two objects and return the distance between two objects.
    * ```ts
    * if (obj.getDistance(objCompare, optionalFn)) {}
    * ```
    */
   getDistance(compareTo: typeof this, fn?: GetPositionFn<this>): number;
   getDistance(compareTo: IWrapGridObject, fn?: GetPositionFn<IWrapGridObject>): number;
   getDistance(compareTo: typeof this, fn?: GetPositionFn<this>): number {
      return resolveGridDistance<typeof this>(this, compareTo, (o) => o.getPosition(fn));
   }

   /**
    * Compare two objects and return if the objects is in vertical alignment.
    * ```ts
    * if (obj.isVertical(objCompare, optionalFn)) {}
    * ```
    */
   isVertical(compareTo: typeof this, fn?: GetPositionFn<this>): boolean;
   isVertical(compareTo: IWrapGridObject, fn?: GetPositionFn<IWrapGridObject>): boolean;
   isVertical(compareTo: typeof this, fn?: GetPositionFn<this>): boolean {
      return isVertical<typeof this>(this, compareTo, 0.001, (o) => o.getPosition(fn));
   }

   /**
    * Compare two objects and return if the objects is in horizontal alignment.
    * ```ts
    * if (obj.isHorizontal(objCompare, optionalFn)) {}
    * ```
    */
   isHorizontal(compareTo: typeof this, fn?: GetPositionFn<this>): boolean;
   isHorizontal(compareTo: IWrapGridObject, fn?: GetPositionFn<IWrapGridObject>): boolean;
   isHorizontal(compareTo: typeof this, fn?: GetPositionFn<this>): boolean {
      return isHorizontal<typeof this>(this, compareTo, 0.001, (o) => o.getPosition(fn));
   }

   /**
    * Compare two objects and return if the objects is in diagonal alignment.
    * ```ts
    * if (obj.isDiagonal(objCompare, optionalFn)) {}
    * ```
    */
   isDiagonal(compareTo: typeof this, fn?: GetPositionFn<this>): boolean;
   isDiagonal(compareTo: IWrapGridObject, fn?: GetPositionFn<IWrapGridObject>): boolean;
   isDiagonal(compareTo: typeof this, fn?: GetPositionFn<this>): boolean {
      return isDiagonal<typeof this>(this, compareTo, 0.001, (o) => o.getPosition(fn));
   }

   /**
    * Compare two  objects and return if the  objects is an inline.
    * ```ts
    * if (obj.isInline(objCompare, optionalLapping, optionalFn)) {}
    * ```
    */
   isInline(compareTo: typeof this, lapping?: number | null, fn?: GetPositionFn<this>): boolean;
   isInline(
      compareTo: IWrapGridObject,
      lapping?: number | null,
      fn?: GetPositionFn<IWrapGridObject>,
   ): boolean;
   isInline(compareTo: typeof this, lapping?: number | null, fn?: GetPositionFn<this>): boolean {
      return isInline<typeof this>(this, compareTo, lapping ?? 0.5, (o) => o.getPosition(fn));
   }

   /**
    * Compare two objects and return if the objects is adjacent.
    * ```ts
    * if (obj.isAdjacent(objCompare, optionalFn)) {}
    * ```
    */
   isAdjacent(compareTo: typeof this, fn?: GetPositionFn<this>): boolean;
   isAdjacent(compareTo: IWrapGridObject, fn?: GetPositionFn<IWrapGridObject>): boolean;
   isAdjacent(compareTo: typeof this, fn?: GetPositionFn<this>): boolean {
      return isAdjacent<typeof this>(this, compareTo, 0.001, (o) => o.getPosition(fn));
   }

   /**
    * Compare two objects and return if the objects is a window.
    * ```ts
    * if (obj.isWindow(objCompare, optionalDistance, optionalFn)) {}
    * ```
    */
   isWindow(compareTo: typeof this, distance?: number | null, fn?: GetPositionFn<this>): boolean;
   isWindow(
      compareTo: IWrapGridObject,
      distance?: number | null,
      fn?: GetPositionFn<IWrapGridObject>,
   ): boolean;
   isWindow(compareTo: typeof this, distance?: number | null, fn?: GetPositionFn<this>): boolean {
      return isWindow<typeof this>(this, compareTo, distance ?? 1.8, (o) => o.getPosition(fn));
   }

   /**
    * Compare two objects and return if the objects is a slanted window.
    * ```ts
    * if (obj.isSlantedWindow(objCompare, distance, optionalFn)) {}
    * ```
    */
   isSlantedWindow(compareTo: typeof this, fn?: GetPositionFn<this>): boolean;
   isSlantedWindow(compareTo: IWrapGridObject, fn?: GetPositionFn<IWrapGridObject>): boolean;
   isSlantedWindow(compareTo: typeof this, fn?: GetPositionFn<this>): boolean {
      return isSlantedWindow<typeof this>(this, compareTo, (o) => o.getPosition(fn));
   }
}
