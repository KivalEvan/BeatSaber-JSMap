import type { ILightTranslationEvent } from './types/lightTranslationEvent.ts';
import type { IWrapLightTranslationEvent } from '../wrapper/types/lightTranslationEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEvent } from '../wrapper/lightTranslationEvent.ts';

/** Serialize beatmap v3 `Light Translation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightTranslationEvent(
   data: IWrapLightTranslationEvent,
): ILightTranslationEvent {
   return {
      b: data.time,
      e: data.easing,
      p: data.previous,
      t: data.translation,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Translation Event` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightTranslationEvent(
   data: ILightTranslationEvent,
   options?: DeserializationOptions,
): IWrapLightTranslationEvent {
   return createLightTranslationEvent({
      time: data.b,
      easing: data.e,
      previous: data.p,
      translation: data.t,
      customData: data.customData,
   }, options);
}
