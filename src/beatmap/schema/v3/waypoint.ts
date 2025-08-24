import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWaypoint } from './types/waypoint.ts';
import type { IWrapWaypoint } from '../../core/types/waypoint.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createWaypoint } from '../../core/waypoint.ts';

/**
 * Schema serialization for v3 `Waypoint`.
 */
export const waypoint: ISchemaContainer<IWrapWaypoint, IWaypoint> = {
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
      return createWaypoint({
         time: data.b,
         posX: data.x,
         posY: data.y,
         direction: data.d,
         customData: data.customData,
      });
   },
};
