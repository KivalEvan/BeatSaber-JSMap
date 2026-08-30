import type { IEvent } from './types/event.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { createBPMEvent } from '../wrapper/bpmEvent.ts';

/** Serialize beatmap v1 `BPMEvent` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBPMEvent(data: IWrapBPMEvent): IEvent {
   return {
      _time: data.time,
      _type: 100,
      _value: Math.round(data.bpm),
   };
}

/** Deserialize schema object into beatmap v1 `BPMEvent` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBPMEvent(
   data: IEvent,
   options?: DeserializationOptions,
): IWrapBPMEvent {
   return createBPMEvent({
      time: data._time,
      bpm: data._value,
   }, options);
}
