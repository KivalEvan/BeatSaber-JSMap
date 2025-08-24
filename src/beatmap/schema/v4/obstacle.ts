import type { IObstacleContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapObstacle } from '../wrapper/types/obstacle.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createObstacle } from '../wrapper/obstacle.ts';

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
