import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v3/obstacle.ts';
import type { IWrapObstacle } from '../../../types/beatmap/wrapper/obstacle.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createObstacle } from '../../core/obstacle.ts';

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
