import type { IWaypointContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapWaypoint } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createWaypoint } from '../../core/waypoint.ts';

/**
 * Schema serialization for v4 `Waypoint`.
 */
export const waypoint: ISchemaContainer<IWrapWaypoint, IWaypointContainer> = {
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
            d: data.direction,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return createWaypoint({
         time: data.object?.b,
         laneRotation: data.object?.r,
         posX: data.data?.x,
         posY: data.data?.y,
         direction: data.data?.d,
         customData: data.data?.customData,
      });
   },
};
