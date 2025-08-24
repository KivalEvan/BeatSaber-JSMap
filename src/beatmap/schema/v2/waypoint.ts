import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWaypoint } from '../../schema/v2/types/waypoint.ts';
import type { IWrapWaypoint } from '../wrapper/types/waypoint.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createWaypoint } from '../wrapper/waypoint.ts';

/**
 * Schema serialization for v2 `Waypoint`.
 */
export const waypoint: ISchemaContainer<IWrapWaypoint, IWaypoint> = {
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
      return createWaypoint({
         time: data._time,
         posX: data._lineIndex,
         posY: data._lineLayer,
         direction: data._offsetDirection,
         customData: data._customData,
      });
   },
};
