import { LINE_COUNT } from './types/constants.ts';
import { Obstacle } from './types/obstacle.ts';

/** Mirror obstacle.
 * ```ts
 * obstacle.mirror(obstacle);
 * obstacle.mirror(obstacleAry);
 * ```
 */
export const mirror = (obstacle: Obstacle | Obstacle[]) => {
    if (Array.isArray(obstacle)) {
        obstacle.forEach((o) => mirror(o));
        return;
    }
    obstacle.x = LINE_COUNT - 1 - obstacle.x;
};

/** Get obstacle and return the Beatwalls' position x and y value in tuple.
 * ```ts
 * const obstaclePos = getPosition(wall);
 * ```
 */
export const getPosition = (obstacle: Obstacle): [number, number] => {
    // if (obstacle._customData?._position) {
    //     return [obstacle._customData._position[0], obstacle._customData._position[1]];
    // }
    return [
        (obstacle.x <= -1000
            ? obstacle.x / 1000
            : obstacle.x >= 1000
            ? obstacle.x / 1000
            : obstacle.x) - 2,
        (obstacle.y <= -1000
            ? obstacle.y / 1000
            : obstacle.y >= 1000
            ? obstacle.y / 1000
            : obstacle.y) - 0.5,
    ];
};

/** Check if obstacle is interactive.
 * ```ts
 * if (isInteractive(wall)) {}
 * ```
 */
// FIXME: there are a lot more other variables
export const isInteractive = (obstacle: Obstacle): boolean => {
    return obstacle.w - obstacle.x > 1 || obstacle.x === 1 || obstacle.x === 2;
};

/** Check if obstacle is crouch.
 * ```ts
 * if (isCrouch(wall)) {}
 * ```
 */
// FIXME: doesnt work properly
export const isCrouch = (obstacle: Obstacle): boolean => {
    return (
        obstacle.y === 2 && (obstacle.w > 2 || (obstacle.w === 2 && obstacle.x === 1))
    );
};

/** Check if obstacle has zero value.
 * ```ts
 * if (hasZero(wall)) {}
 * ```
 */
export const hasZero = (obstacle: Obstacle): boolean => {
    return obstacle.d === 0 || obstacle.w === 0 || obstacle.h === 0;
};

/** Check if current obstacle is longer than previous obstacle.
 * ```ts
 * if (isLonger(currWall, prevWall)) {}
 * ```
 */
export const isLonger = (
    currObstacle: Obstacle,
    prevObstacle: Obstacle,
    prevOffset = 0
): boolean => {
    return (
        currObstacle.b + currObstacle.d > prevObstacle.b + prevObstacle.d + prevOffset
    );
};

/** Check if obstacle has Mapping Extensions properties.
 * ```ts
 * if (hasMappingExtensions(wall)) {}
 * ```
 */
export const hasMappingExtensions = (obstacle: Obstacle): boolean => {
    return obstacle.y < 0 || obstacle.y > 2;
};

/** Check if obstacle is a valid, vanilla obstacle.
 * ```ts
 * if (isValid(wall)) {}
 * ```
 */
export const isValid = (obstacle: Obstacle): boolean => {
    return !hasMappingExtensions(obstacle) && !hasZero(obstacle);
};
