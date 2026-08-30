import type { IRotationEvent } from './types/rotationEvent.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createRotationEvent } from '../wrapper/rotationEvent.ts';

/** Serialize beatmap v3 `Rotation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeRotationEvent(data: IWrapRotationEvent): IRotationEvent {
   return {
      b: data.time,
      e: data.executionTime,
      r: data.rotation,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Rotation Event` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeRotationEvent(
   data: IRotationEvent,
   options?: DeserializationOptions,
): IWrapRotationEvent {
   return createRotationEvent({
      time: data.b,
      executionTime: data.e,
      rotation: data.r,
      customData: data.customData,
   }, options);
}
