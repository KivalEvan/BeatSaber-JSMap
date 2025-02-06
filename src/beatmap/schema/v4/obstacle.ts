import type { IObstacleContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapObstacle } from '../../../types/beatmap/wrapper/obstacle.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createObstacle } from '../../core/obstacle.ts';

/**
 * Schema serialization for v4 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacle, IObstacleContainer> = {
   serialize(data) {
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
   },
   deserialize(data) {
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
   },
};
