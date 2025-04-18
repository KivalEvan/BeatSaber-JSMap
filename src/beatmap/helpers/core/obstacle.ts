import type { IWrapObstacle } from '../../../types/beatmap/wrapper/obstacle.ts';

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
