import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../wrapper/basicEvent.ts';

/** Serialize beatmap v2 `Basic Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEvent(data: IWrapBasicEvent): IEvent {
   return {
      _time: data.time,
      _type: data.type,
      _value: data.value,
      _floatValue: data.floatValue,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `Basic Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEvent(data: IEvent): IWrapBasicEvent {
   return createBasicEvent({
      time: data._time,
      type: data._type,
      value: data._value,
      floatValue: data._floatValue,
      customData: data._customData,
   });
}
