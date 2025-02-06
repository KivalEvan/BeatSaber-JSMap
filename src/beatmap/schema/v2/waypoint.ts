import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWaypoint } from '../../../types/beatmap/v2/waypoint.ts';
import type { IWrapWaypoint } from '../../../types/beatmap/wrapper/waypoint.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createWaypoint } from '../../core/waypoint.ts';

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
