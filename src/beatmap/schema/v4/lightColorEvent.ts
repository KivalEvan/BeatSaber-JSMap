import type { ILightColorEventContainer } from './types/container.ts';
import type { IWrapLightColorEvent } from '../wrapper/types/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEvent } from '../wrapper/lightColorEvent.ts';

/** Serialize beatmap v4 `Light Color Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightColorEvent(data: IWrapLightColorEvent): ILightColorEventContainer {
   return {
      data: {
         p: data.previous,
         c: data.color,
         e: data.easing,
         b: data.brightness,
         f: data.frequency,
         sb: data.strobeBrightness,
         sf: data.strobeFade,
         customData: deepCopy(data.customData),
      },
      time: data.time,
   };
}

/** Deserialize schema object into beatmap v4 `Light Color Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEvent(data: ILightColorEventContainer): IWrapLightColorEvent {
   return createLightColorEvent({
      time: data.time,
      previous: data.data?.p,
      color: data.data?.c,
      frequency: data.data?.f,
      easing: data.data?.e,
      brightness: data.data?.b,
      strobeBrightness: data.data?.sb,
      strobeFade: data.data?.sf,
      customData: data.data?.customData,
   });
}
