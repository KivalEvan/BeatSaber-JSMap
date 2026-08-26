import type { IObstacleContainer } from './types/container.ts';
import type { IWrapObstacle } from '../wrapper/types/obstacle.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createObstacle } from '../wrapper/obstacle.ts';

/** Serialize beatmap v4 `Obstacle` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeObstacle(data: IWrapObstacle): IObstacleContainer {
   return {
      object: {
         b: data.time,
         i: 0,
         r: data.laneRotation,
         customData: {},
      },
      data: {
         x: data.posX,
         y: data.posY,
         d: data.duration,
         w: data.width,
         h: data.height,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `Obstacle` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeObstacle(data: IObstacleContainer): IWrapObstacle {
   return createObstacle({
      time: data.object?.b,
      laneRotation: data.object?.r,
      posX: data.data?.x,
      posY: data.data?.y,
      duration: data.data?.d,
      width: data.data?.w,
      height: data.data?.h,
      customData: data.data?.customData,
   });
}
