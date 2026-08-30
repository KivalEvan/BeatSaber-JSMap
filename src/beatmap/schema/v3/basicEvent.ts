import type { IBasicEvent } from './types/basicEvent.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../wrapper/basicEvent.ts';

/** Serialize beatmap v3 `Basic Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEvent(data: IWrapBasicEvent): IBasicEvent {
   return {
      b: data.time,
      et: data.type,
      i: data.value,
      f: data.floatValue,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Basic Event` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEvent(
   data: IBasicEvent,
   options?: DeserializationOptions,
): IWrapBasicEvent {
   return createBasicEvent({
      time: data.b,
      type: data.et,
      value: data.i,
      floatValue: data.f,
      customData: data.customData,
   }, options);
}
