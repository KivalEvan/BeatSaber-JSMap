import type { ILightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import type { IWrapLightRotationEventBoxGroup } from '../wrapper/types/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import {
   deserializeLightRotationEventBox,
   serializeLightRotationEventBox,
} from './lightRotationEventBox.ts';

/** Serialize beatmap v3 `Light Rotation Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightRotationEventBoxGroup(
   data: IWrapLightRotationEventBoxGroup,
): ILightRotationEventBoxGroup {
   return {
      b: data.time,
      g: data.id,
      e: data.boxes.map((x) => {
         return serializeLightRotationEventBox(x);
      }),
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Rotation Event Box Group` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightRotationEventBoxGroup(
   data: ILightRotationEventBoxGroup,
): IWrapLightRotationEventBoxGroup {
   return createLightRotationEventBoxGroup({
      time: data.b,
      id: data.g,
      boxes: data.e?.map((x) => {
         return deserializeLightRotationEventBox(x);
      }),
      customData: data.customData,
   });
}
