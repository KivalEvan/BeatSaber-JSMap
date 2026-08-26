import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBPMEvent } from '../wrapper/bpmEvent.ts';

/** Serialize beatmap v2 `BPMEvent` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBPMEvent(data: IWrapBPMEvent): IEvent {
   return {
      _time: data.time,
      _type: 100,
      _value: 0,
      _floatValue: data.bpm,
      _customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v2 `BPMEvent` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBPMEvent(data: IEvent): IWrapBPMEvent {
   return createBPMEvent({
      time: data._time,
      bpm: data._floatValue ?? data._value,
      customData: data._customData,
   });
}
