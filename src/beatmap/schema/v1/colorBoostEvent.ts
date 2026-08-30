import type { IEvent } from './types/event.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/** Serialize beatmap v1 `Color Boost Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorBoostEvent(data: IWrapColorBoostEvent): IEvent {
   return {
      _time: data.time,
      _type: 5,
      _value: data.toggle ? 1 : 0,
   };
}

/** Deserialize schema object into beatmap v1 `Color Boost Event` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorBoostEvent(
   data: IEvent,
   options?: DeserializationOptions,
): IWrapColorBoostEvent {
   return createColorBoostEvent({
      time: data._time,
      toggle: data._value === 1,
   }, options);
}
