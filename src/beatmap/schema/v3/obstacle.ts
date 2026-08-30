import type { IObstacle } from './types/obstacle.ts';
import type { IWrapObstacle } from '../wrapper/types/obstacle.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createObstacle } from '../wrapper/obstacle.ts';

/** Serialize beatmap v3 `Obstacle` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeObstacle(data: IWrapObstacle): IObstacle {
   return {
      b: data.time,
      x: data.posX,
      y: data.posY,
      d: data.duration,
      w: data.width,
      h: data.height,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Obstacle` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeObstacle(
   data: IObstacle,
   options?: DeserializationOptions,
): IWrapObstacle {
   return createObstacle({
      time: data.b,
      posX: data.x,
      posY: data.y,
      duration: data.d,
      width: data.w,
      height: data.h,
      customData: data.customData,
   }, options);
}
