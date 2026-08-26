import type { IWaypoint } from './types/waypoint.ts';
import type { IWrapWaypoint } from '../wrapper/types/waypoint.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createWaypoint } from '../wrapper/waypoint.ts';

/** Serialize beatmap v3 `Waypoint` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeWaypoint(data: IWrapWaypoint): IWaypoint {
   return {
      b: data.time,
      x: data.posX,
      y: data.posY,
      d: data.direction,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Waypoint` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeWaypoint(data: IWaypoint): IWrapWaypoint {
   return createWaypoint({
      time: data.b,
      posX: data.x,
      posY: data.y,
      direction: data.d,
      customData: data.customData,
   });
}
