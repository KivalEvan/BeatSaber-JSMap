import type { IEventBoxGroupContainer, ILightColorBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import {
   deserializeLightColorEventBox,
   serializeLightColorEventBox,
} from './lightColorEventBox.ts';

/** Serialize beatmap v4 `Light Color Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightColorEventBoxGroup(
   data: IWrapLightColorEventBoxGroup,
): IEventBoxGroupContainer<ILightColorBoxContainer> {
   return {
      object: {
         t: EventBoxType.COLOR,
         b: data.time,
         g: data.id,
         e: [],
         customData: deepCopy(data.customData),
      },
      boxData: data.boxes.map((x) => {
         return serializeLightColorEventBox(x);
      }),
   };
}

/** Deserialize schema object into beatmap v4 `Light Color Event Box Group` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEventBoxGroup(
   data: IEventBoxGroupContainer<ILightColorBoxContainer>,
): IWrapLightColorEventBoxGroup {
   return createLightColorEventBoxGroup({
      time: data.object?.b,
      id: data.object?.g,
      boxes: data.boxData?.map((x) => {
         return deserializeLightColorEventBox(x);
      }),
      customData: data.object?.customData,
   });
}
