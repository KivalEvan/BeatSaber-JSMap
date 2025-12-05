import { isInteractiveObstacle } from '../../beatmap/helpers/core/obstacle.ts';
import {
   hasChromaObstacleV2,
   hasChromaObstacleV3,
   hasMappingExtensionsObstacleV2,
   hasMappingExtensionsObstacleV3,
   hasMappingExtensionsObstacleV4,
   hasNoodleExtensionsObstacleV2,
   hasNoodleExtensionsObstacleV3,
} from '../../beatmap/helpers/modded/has.ts';
import type { IWrapObstacle } from '../../beatmap/schema/wrapper/types/obstacle.ts';
import type { IObstacleCount } from './types/stats.ts';

/**
 * Count number of type of obstacles with their properties in given array and return a obstacle count object.
 * ```ts
 * const list = count(walls);
 * console.log(list);
 * ```
 */
export function countObstacle<T extends IWrapObstacle>(
   obstacles: T[],
   version = 2
): IObstacleCount {
   const obstacleCount: IObstacleCount = {
      total: 0,
      interactive: 0,
      chroma: 0,
      noodleExtensions: 0,
      mappingExtensions: 0,
   };
   const hasChroma = version >= 3 ? hasChromaObstacleV3 : hasChromaObstacleV2;
   const hasNoodle =
      version >= 3
         ? hasNoodleExtensionsObstacleV3
         : hasNoodleExtensionsObstacleV2;
   const hasME =
      version >= 4
         ? hasMappingExtensionsObstacleV4
         : version === 3
         ? hasMappingExtensionsObstacleV3
         : hasMappingExtensionsObstacleV2;

   for (let i = obstacles.length - 1; i > -1; i--) {
      obstacleCount.total++;
      if (isInteractiveObstacle(obstacles[i])) {
         obstacleCount.interactive++;
      }
      if (hasChroma(obstacles[i])) {
         obstacleCount.chroma++;
      }
      if (hasNoodle(obstacles[i])) {
         obstacleCount.noodleExtensions++;
      }
      if (hasME(obstacles[i])) {
         obstacleCount.mappingExtensions++;
      }
   }
   return obstacleCount;
}
