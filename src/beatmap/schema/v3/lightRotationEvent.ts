import type { ILightRotationEvent } from './types/lightRotationEvent.ts';
import type { IWrapLightRotationEvent } from '../wrapper/types/lightRotationEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEvent } from '../wrapper/lightRotationEvent.ts';

/** Serialize beatmap v3 `Light Rotation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightRotationEvent(data: IWrapLightRotationEvent): ILightRotationEvent {
   return {
      b: data.time,
      e: data.easing,
      l: data.loop,
      o: data.direction,
      p: data.previous,
      r: data.rotation,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Rotation Event` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightRotationEvent(
   data: ILightRotationEvent,
   options?: DeserializationOptions,
): IWrapLightRotationEvent {
   return createLightRotationEvent({
      time: data.b,
      easing: data.e,
      loop: data.l,
      direction: data.o,
      previous: data.p,
      rotation: data.r,
      customData: data.customData,
   }, options);
}
