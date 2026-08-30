import type { IWaypoint } from '../../schema/v2/types/waypoint.ts';
import type { IWrapWaypoint } from '../wrapper/types/waypoint.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createWaypoint } from '../wrapper/waypoint.ts';

/** Serialize beatmap v2 `Waypoint` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeWaypoint(data: IWrapWaypoint): IWaypoint {
   return {
      _time: data.time,
      _lineIndex: data.posX,
      _lineLayer: data.posY,
      _offsetDirection: data.direction,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Waypoint` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeWaypoint(
   data: IWaypoint,
   options?: DeserializationOptions,
): IWrapWaypoint {
   return createWaypoint({
      time: data._time,
      posX: data._lineIndex,
      posY: data._lineLayer,
      direction: data._offsetDirection,
      customData: data._customData,
   }, options);
}
