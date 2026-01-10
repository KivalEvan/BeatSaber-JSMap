import type { IWrapObstacle } from '../../schema/wrapper/types/obstacle.ts';

/** Check if obstacle is interactive. */
export function isInteractiveObstacle<
   T extends Pick<IWrapObstacle, 'posX' | 'width'>,
>(object: T): boolean {
   // FIXME: there are a lot more other variables
   return (
      (object.posX < 0 && object.width > 1 - object.posX) ||
      (object.posX === 0 && object.width > 1) ||
      object.posX === 1 ||
      object.posX === 2
   );
}

/** Check if obstacle has zero value. */
export function isZeroValueObstacle<
   T extends Pick<IWrapObstacle, 'duration' | 'width' | 'height'>,
>(object: T): boolean {
   return object.duration === 0 || object.width === 0 || object.height === 0;
}
/** Check if obstacle has negative value. */
export function isNegativeValueObstacle<
   T extends Pick<IWrapObstacle, 'posY' | 'duration' | 'width' | 'height'>,
>(object: T): boolean {
   return object.posY < 0 || object.duration < 0 || object.width < 0 || object.height < 0;
}

/** Check if obstacle is full-height. */
export function isFullHeightObstacle<
   T extends Pick<IWrapObstacle, 'posY' | 'height'>,
>(object: T): boolean {
   return object.posY === 0 && object.height === 5;
}
/** Check if obstacle is crouch-height. */
export function isCrouchHeightObstacle<
   T extends Pick<IWrapObstacle, 'posY' | 'height'>,
>(object: T): boolean {
   return object.posY === 2 && object.height === 3;
}
/** Check if obstacle is bounded (within the constraints of free obstacle placement). */
export function isBoundedObstacle<
   T extends Pick<IWrapObstacle, 'posY' | 'height'>,
>(object: T): boolean {
   return object.posY >= 0 && object.posY <= 4 && object.height >= 1 && object.height <= 5;
}
