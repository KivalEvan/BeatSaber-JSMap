import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWaypoint } from '../../../types/beatmap/v3/waypoint.ts';
import type { IWrapWaypointAttribute } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Waypoint`.
 */
export const waypoint: ISchemaContainer<IWrapWaypointAttribute, IWaypoint> = {
   serialize(data) {
      return {
         b: data.time,
         x: data.posX,
         y: data.posY,
         d: data.direction,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         laneRotation: 0,
         posX: data.x ?? 0,
         posY: data.y ?? 0,
         direction: data.d ?? 0,
         customData: data.customData ?? {},
      };
   },
};
