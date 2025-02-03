import type { IWaypointContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapWaypointAttribute } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Waypoint`.
 */
export const waypoint: ISchemaContainer<IWrapWaypointAttribute, IWaypointContainer> = {
   serialize(data: IWrapWaypointAttribute): Required<IWaypointContainer> {
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
            o: data.direction,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return {
         time: data.object?.b ?? 0,
         laneRotation: data.object?.r ?? 0,
         posX: data.data?.x ?? 0,
         posY: data.data?.y ?? 0,
         direction: data.data?.d ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
