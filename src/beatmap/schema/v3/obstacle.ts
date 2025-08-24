import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IObstacle } from './types/obstacle.ts';
import type { IWrapObstacle } from '../wrapper/types/obstacle.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createObstacle } from '../wrapper/obstacle.ts';

/**
 * Schema serialization for v3 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacle, IObstacle> = {
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
      return createObstacle({
         time: data.b,
         posX: data.x,
         posY: data.y,
         duration: data.d,
         width: data.w,
         height: data.h,
         customData: data.customData,
      });
   },
};
