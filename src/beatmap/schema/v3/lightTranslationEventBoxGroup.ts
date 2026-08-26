import type { ILightTranslationEventBoxGroup } from './types/lightTranslationEventBoxGroup.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../wrapper/types/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import {
   deserializeLightTranslationEventBox,
   serializeLightTranslationEventBox,
} from './lightTranslationEventBox.ts';

/** Serialize beatmap v3 `Light Translation Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightTranslationEventBoxGroup(
   data: IWrapLightTranslationEventBoxGroup,
): ILightTranslationEventBoxGroup {
   return {
      b: data.time,
      g: data.id,
      e: data.boxes.map((x) => {
         return serializeLightTranslationEventBox(x);
      }),
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Translation Event Box Group` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightTranslationEventBoxGroup(
   data: ILightTranslationEventBoxGroup,
): IWrapLightTranslationEventBoxGroup {
   return createLightTranslationEventBoxGroup({
      time: data.b,
      id: data.g,
      boxes: data.e?.map((x) => {
         return deserializeLightTranslationEventBox(x);
      }),
      customData: data.customData,
   });
}
