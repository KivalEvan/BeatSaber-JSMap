import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/** Serialize beatmap v2 `Color Boost Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorBoostEvent(data: IWrapColorBoostEvent): IEvent {
   return {
      _time: data.time,
      _type: 5,
      _value: data.toggle ? 1 : 0,
      _floatValue: 0,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Color Boost Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorBoostEvent(data: IEvent): IWrapColorBoostEvent {
   return createColorBoostEvent({
      time: data._time,
      toggle: !!data._value,
      customData: data._customData,
   });
}
