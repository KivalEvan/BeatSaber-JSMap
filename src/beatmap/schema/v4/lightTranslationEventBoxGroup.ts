import type { IEventBoxGroupContainer, ILightTranslationBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../wrapper/types/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import {
   deserializeLightTranslationEventBox,
   serializeLightTranslationEventBox,
} from './lightTranslationEventBox.ts';

/** Serialize beatmap v4 `Light Translation Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightTranslationEventBoxGroup(
   data: IWrapLightTranslationEventBoxGroup,
): IEventBoxGroupContainer<ILightTranslationBoxContainer> {
   return {
      object: {
         t: EventBoxType.TRANSLATION,
         b: data.time,
         g: data.id,
         e: [],
         customData: deepCopy(data.customData),
      },
      boxData: data.boxes.map((x) => {
         return serializeLightTranslationEventBox(x);
      }),
   };
}

/** Deserialize schema object into beatmap v4 `Light Translation Event Box Group` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightTranslationEventBoxGroup(
   data: IEventBoxGroupContainer<ILightTranslationBoxContainer>,
): IWrapLightTranslationEventBoxGroup {
   return createLightTranslationEventBoxGroup({
      time: data.object?.b,
      id: data.object?.g,
      boxes: data.boxData?.map((x) => {
         return deserializeLightTranslationEventBox(x);
      }),
      customData: data.object?.customData,
   });
}
