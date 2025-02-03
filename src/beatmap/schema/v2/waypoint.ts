import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWaypoint } from '../../../types/beatmap/v2/waypoint.ts';
import type { IWrapWaypointAttribute } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `Waypoint`.
 */
export const waypoint: ISchemaContainer<IWrapWaypointAttribute, IWaypoint> = {
   serialize(data) {
      return {
         _time: data.time,
         _lineIndex: data.posX,
         _lineLayer: data.posY,
         _offsetDirection: data.direction,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data._time ?? 0,
         posX: data._lineIndex ?? 0,
         posY: data._lineLayer ?? 0,
         direction: data._offsetDirection ?? 0,
         laneRotation: 0,
         customData: data._customData ?? {},
      };
   },
};
