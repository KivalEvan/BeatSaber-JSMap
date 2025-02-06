import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v1/obstacle.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import { remap } from '../../../utils/math.ts';
import { createObstacle } from '../../core/obstacle.ts';

/**
 * Schema serialization for v1 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacleAttribute, IObstacle> = {
   serialize(data) {
      let type = 0;
      if (data.height >= 0 && data.posY >= 0) {
         type = data.height * 1000 + data.posY + 4001;
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
      };
   },
   deserialize(data) {
      const type = data._type ?? 0;
      // FIXME: this might be entirely wrong
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
      return createObstacle({
         time: data._time,
         posX: data._lineIndex,
         posY,
         duration: data._duration,
         width: data._width,
         height,
      });
   },
};
