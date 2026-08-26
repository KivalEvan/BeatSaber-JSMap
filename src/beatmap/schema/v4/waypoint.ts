import type { IWaypointContainer } from './types/container.ts';
import type { IWrapWaypoint } from '../wrapper/types/waypoint.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createWaypoint } from '../wrapper/waypoint.ts';

/** Serialize beatmap v4 `Waypoint` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeWaypoint(data: IWrapWaypoint): IWaypointContainer {
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
         d: data.direction,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `Waypoint` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeWaypoint(data: IWaypointContainer): IWrapWaypoint {
   return createWaypoint({
      time: data.object?.b,
      laneRotation: data.object?.r,
      posX: data.data?.x,
      posY: data.data?.y,
      direction: data.data?.d,
      customData: data.data?.customData,
   });
}
