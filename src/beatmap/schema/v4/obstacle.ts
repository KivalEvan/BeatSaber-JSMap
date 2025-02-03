import type { IObstacleContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacleContainer> = {
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
      return {
         time: data.object?.b ?? 0,
         laneRotation: data.object?.r ?? 0,
         posX: data.data?.x ?? 0,
         posY: data.data?.y ?? 0,
         duration: data.data?.d ?? 0,
         width: data.data?.w ?? 0,
         height: data.data?.h ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
