import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IObstacle } from '../../../types/beatmap/v1/obstacle.ts';
import type { IWrapObstacle } from '../../../types/beatmap/wrapper/obstacle.ts';
import { createObstacle } from '../../core/obstacle.ts';

function fixPosYForExtendedType(type: number): number {
   if (type < 1000 || type > 4005000) return 0;
   const posY = type >= 4001 && type <= 4005000 ? (type - 4001) % 1000 : 0;
   return (posY * 5) + 1000; // will be consistent with boundaries for v3/v4 extended walls
}
function fixHeightForExtendedType(type: number) {
   if (type < 1000 || type > 4005000) return 0;
   const height = type >= 4001 && type <= 4005000 ? Math.floor((type - 4001) / 1000) : type - 1000;
   return (height * 5) + 1000; // will be consistent with boundaries for v3/v4 extended walls
}

/**
 * Schema serialization for v1 `Obstacle`.
 */
export const obstacle: ISchemaContainer<IWrapObstacle, IObstacle> = {
   serialize(data) {
      let type = 0;
      if (data.height >= 0 && data.posY >= 0) {
         const posY = data.posY >= 1000 ? data.posY - 1000 : data.posY / 1000;
         const height = data.height >= 1000 ? data.height - 1000 : data.height / 1000;
         type = Math.floor((height / 5) * 1000 + (posY / 5) + 4001);
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
      return createObstacle({
         time: data._time,
         posX: data._lineIndex,
         posY: type === 0 ? 0 : type === 1 ? 2 : fixPosYForExtendedType(type),
         duration: data._duration,
         width: data._width,
         height: type === 0 ? 5 : type === 1 ? 3 : fixHeightForExtendedType(type),
      });
   },
};
