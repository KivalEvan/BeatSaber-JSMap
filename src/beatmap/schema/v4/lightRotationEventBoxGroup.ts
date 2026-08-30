import type { IEventBoxGroupContainer, ILightRotationBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { IWrapLightRotationEventBoxGroup } from '../wrapper/types/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import {
   deserializeLightRotationEventBox,
   serializeLightRotationEventBox,
} from './lightRotationEventBox.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `Light Rotation Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightRotationEventBoxGroup(
   data: IWrapLightRotationEventBoxGroup,
): IEventBoxGroupContainer<ILightRotationBoxContainer> {
   return {
      object: {
         t: EventBoxType.ROTATION,
         b: data.time,
         g: data.id,
         e: [],
         customData: deepCopy(data.customData),
      },
      boxData: data.boxes.map((x) => {
         return serializeLightRotationEventBox(x);
      }),
   };
}

/** Deserialize schema object into beatmap v4 `Light Rotation Event Box Group` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightRotationEventBoxGroup(
   data: IEventBoxGroupContainer<ILightRotationBoxContainer>,
   options?: DeserializationOptions,
): IWrapLightRotationEventBoxGroup {
   return createLightRotationEventBoxGroup({
      time: data.object?.b,
      id: data.object?.g,
      boxes: data.boxData?.map((x) => {
         return deserializeLightRotationEventBox(x, options);
      }),
      customData: data.object?.customData,
   }, options);
}
