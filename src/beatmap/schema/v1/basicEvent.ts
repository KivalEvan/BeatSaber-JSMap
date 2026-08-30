import type { IEvent } from './types/event.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { createBasicEvent } from '../wrapper/basicEvent.ts';

/** Serialize beatmap v1 `Basic Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEvent(data: IWrapBasicEvent): IEvent {
   return {
      _time: data.time,
      _type: data.type,
      _value: data.value,
   };
}

/** Deserialize schema object into beatmap v1 `Basic Event` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEvent(
   data: IEvent,
   options?: DeserializationOptions,
): IWrapBasicEvent {
   return createBasicEvent({
      time: data._time,
      type: data._type,
      value: data._value,
      floatValue: 1,
   }, options);
}
