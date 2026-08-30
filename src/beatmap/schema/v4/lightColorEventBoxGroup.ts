import type { IEventBoxGroupContainer, ILightColorBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import {
   deserializeLightColorEventBox,
   serializeLightColorEventBox,
} from './lightColorEventBox.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

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
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEventBoxGroup(
   data: IEventBoxGroupContainer<ILightColorBoxContainer>,
   options?: DeserializationOptions,
): IWrapLightColorEventBoxGroup {
   return createLightColorEventBoxGroup({
      time: data.object?.b,
      id: data.object?.g,
      boxes: data.boxData?.map((x) => {
         return deserializeLightColorEventBox(x, options);
      }),
      customData: data.object?.customData,
   }, options);
}
