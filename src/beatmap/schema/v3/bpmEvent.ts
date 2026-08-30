import type { IBPMEvent } from './types/bpmEvent.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBPMEvent } from '../wrapper/bpmEvent.ts';

/** Serialize beatmap v3 `BPMEvent` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBPMEvent(data: IWrapBPMEvent): IBPMEvent {
   return {
      b: data.time,
      m: data.bpm,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `BPMEvent` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBPMEvent(
   data: IBPMEvent,
   options?: DeserializationOptions,
): IWrapBPMEvent {
   return createBPMEvent({
      time: data.b,
      bpm: data.m,
      customData: data.customData,
   }, options);
}
