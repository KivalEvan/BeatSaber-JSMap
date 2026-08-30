import type { IObstacle } from './types/obstacle.ts';
import type { IWrapObstacle } from '../wrapper/types/obstacle.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { createObstacle } from '../wrapper/obstacle.ts';
import { isCrouchHeightObstacle, isFullHeightObstacle } from '../../helpers/core/obstacle.ts';

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

/** Serialize beatmap v1 `Obstacle` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeObstacle(data: IWrapObstacle): IObstacle {
   let type = 0;
   if (Math.abs(data.height) < 1000 && Math.abs(data.posY) < 1000) {
      type = Math.floor((data.height * 200000) + (data.posY * 200) + 4001);
   } else {
      const posY = data.posY >= 1000 ? data.posY - 1000 : data.posY / 1000;
      const height = data.height >= 1000 ? data.height - 1000 : data.height / 1000;
      type = Math.floor((height / 5) * 1000 + (posY / 5) + 4001);
   }
   type = isFullHeightObstacle(data) ? 0 : isCrouchHeightObstacle(data) ? 1 : type;
   return {
      _time: data.time,
      _type: type,
      _lineIndex: data.posX,
      _duration: data.duration,
      _width: data.width,
   };
}

/** Deserialize schema object into beatmap v1 `Obstacle` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeObstacle(
   data: IObstacle,
   options?: DeserializationOptions,
): IWrapObstacle {
   const type = data._type ?? 0;
   return createObstacle({
      time: data._time,
      posX: data._lineIndex,
      posY: type === 0 ? 0 : type === 1 ? 2 : fixPosYForExtendedType(type),
      duration: data._duration,
      width: data._width,
      height: type === 0 ? 5 : type === 1 ? 3 : fixHeightForExtendedType(type),
   }, options);
}
