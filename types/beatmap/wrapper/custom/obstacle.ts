import type { ICustomDataObstacle as ICustomDataObstacleV2 } from '../../v2/custom/obstacle.ts';
import type { ICustomDataObstacle as ICustomDataObstacleV3 } from '../../v3/custom/obstacle.ts';

/**
 * Aggregated custom data for obstacle.
 */
export type ICustomDataObstacle = ICustomDataObstacleV3 & ICustomDataObstacleV2;
