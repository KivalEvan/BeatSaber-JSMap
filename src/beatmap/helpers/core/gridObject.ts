import type { IWrapBaseSlider } from '../../../types/beatmap/wrapper/baseSlider.ts';
import type { IWrapGridObject } from '../../../types/beatmap/wrapper/gridObject.ts';
import type { GetPositionFn } from '../../../types/mod.ts';
import type { Vector2 } from '../../../types/vector.ts';
import {
   vectorDistance,
   vectorIsDiagonal,
   vectorIsHorizontal,
   vectorIsVertical,
} from '../../../utils/math/vector.ts';

/** Get standardized grid position. */
export function resolveGridPosition<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(object: T): Vector2 {
   return [object.posX, object.posY];
}
/** Get standardized grid tail position. */
export function resolveGridTailPosition<
   T extends Pick<IWrapBaseSlider, 'tailPosX' | 'tailPosY'>,
>(object: T): Vector2 {
   return [object.tailPosX, object.tailPosY];
}
/** Get standardized grid distance. */
export function resolveGridDistance<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, fn?: GetPositionFn<T>): number {
   const v1 = fn?.(o1) ?? resolveGridPosition(o1);
   const v2 = fn?.(o2) ?? resolveGridPosition(o2);
   return vectorDistance(v1, v2);
}

/** Check if two objects are in horizontal alignment. */
export function isHorizontal<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, epsilon = 0.001, fn?: GetPositionFn<T>): boolean {
   const v1 = fn?.(o1) ?? resolveGridPosition(o1);
   const v2 = fn?.(o2) ?? resolveGridPosition(o2);
   return vectorIsHorizontal(v1, v2, epsilon);
}
/** Check if two objects are in vertical alignment. */
export function isVertical<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, epsilon = 0.001, fn?: GetPositionFn<T>): boolean {
   const v1 = fn?.(o1) ?? resolveGridPosition(o1);
   const v2 = fn?.(o2) ?? resolveGridPosition(o2);
   return vectorIsVertical(v1, v2, epsilon);
}
/** Check if two objects are in diagonal alignment. */
export function isDiagonal<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, epsilon = 0.001, fn?: GetPositionFn<T>): boolean {
   const v1 = fn?.(o1) ?? resolveGridPosition(o1);
   const v2 = fn?.(o2) ?? resolveGridPosition(o2);
   return vectorIsDiagonal(v1, v2, epsilon);
}
/** Check if two objects are inline. */
export function isInline<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, lapping = 0.5, fn?: GetPositionFn<T>): boolean {
   return resolveGridDistance(o1, o2, fn) <= lapping;
}
/** Check if two objects are adjacent. */
export function isAdjacent<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, epsilon = 0.001, fn?: GetPositionFn<T>): boolean {
   const distance = resolveGridDistance(o1, o2, fn);
   return distance > (0.5 - epsilon) && distance < (1 + epsilon);
}
/** Check if two objects form a "window". */
export function isWindow<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, distance = 1.8, fn?: GetPositionFn<T>): boolean {
   return resolveGridDistance(o1, o2, fn) > distance;
}
/** Check if two objects form a "slanted window". */
export function isSlantedWindow<
   T extends Pick<IWrapGridObject, 'posX' | 'posY'>,
>(o1: T, o2: T, fn?: GetPositionFn<T>): boolean {
   return (
      isWindow(o1, o2, 1.8, fn) &&
      !isDiagonal(o1, o2, 0.001, fn) &&
      !isHorizontal(o1, o2, 0.001, fn) &&
      !isVertical(o1, o2, 0.001, fn)
   );
}

export function mirrorCoordinate(x: number, axis: number): number {
   return axis - 1 - x;
}
