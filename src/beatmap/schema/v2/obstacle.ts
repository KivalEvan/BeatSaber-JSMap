import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v2/obstacle.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import { remap } from '../../../utils/math.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacle> = {
   serialize(data) {
      let type = 0;
      if (data.height >= 0 && data.posY >= 0) {
         type = Math.floor(data.height * 1000 + data.posY + 4001);
      }
      return {
         _time: data.time,
         _type: data.posY === 2 && data.height === 3
            ? 1
            : data.posY === 0 && data.height === 5
            ? 0
            : type,
         _lineIndex: data.posX,
         _duration: data.duration,
         _width: data.width,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      const type = data._type ?? 0;
      const height = type === 1
         ? 3
         : type >= 1000 && type <= 4000
         ? remap(type, 1000, 4000, 0, 15)
         : type > 4000 && type <= 4005000
         ? 0
         : 5;
      const posY = type === 1
         ? 2
         : type > 4000 && type <= 4005000
         ? Math.floor((type - 4001) / 1000)
         : 0;
      return {
         time: data._time ?? 0,
         laneRotation: 0,
         posY,
         posX: data._lineIndex ?? 0,
         duration: data._duration ?? 0,
         width: data._width ?? 0,
         height,
         customData: data._customData ?? {},
      };
   },
};
