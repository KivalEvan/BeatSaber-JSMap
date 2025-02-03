import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v3/obstacle.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacle> = {
   serialize(data) {
      return {
         b: data.time,
         x: data.posX,
         y: data.posY,
         d: data.duration,
         w: data.width,
         h: data.height,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         laneRotation: 0,
         posX: data.x ?? 0,
         posY: data.y ?? 0,
         duration: data.d ?? 0,
         width: data.w ?? 0,
         height: data.h ?? 0,
         customData: data.customData ?? {},
      };
   },
};
