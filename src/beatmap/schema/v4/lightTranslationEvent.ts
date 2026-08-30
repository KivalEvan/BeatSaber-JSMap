import type { ILightTranslationEventContainer } from './types/container.ts';
import type { IWrapLightTranslationEvent } from '../wrapper/types/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEvent } from '../wrapper/lightTranslationEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `Light Translation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightTranslationEvent(
   data: IWrapLightTranslationEvent,
): ILightTranslationEventContainer {
   return {
      data: {
         p: data.previous,
         e: data.easing,
         t: data.translation,
         customData: deepCopy(data.customData),
      },
      time: data.time,
   };
}

/** Deserialize schema object into beatmap v4 `Light Translation Event` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightTranslationEvent(
   data: ILightTranslationEventContainer,
   options?: DeserializationOptions,
): IWrapLightTranslationEvent {
   return createLightTranslationEvent({
      time: data.time,
      previous: data.data?.p,
      easing: data.data?.e,
      translation: data.data?.t,
      customData: data.data?.customData,
   }, options);
}
