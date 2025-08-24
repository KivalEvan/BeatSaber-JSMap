import type { ICustomDataObstacle as ICustomDataObstacleV2 } from '../../../../schema/v2/types/custom/obstacle.ts';
import type { ICustomDataObstacle as ICustomDataObstacleV3 } from '../../../../schema/v3/types/custom/obstacle.ts';

/**
 * Aggregated custom data for obstacle.
 */
export type ICustomDataObstacle = ICustomDataObstacleV3 & ICustomDataObstacleV2;
