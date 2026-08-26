import type { ILightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import {
   deserializeLightColorEventBox,
   serializeLightColorEventBox,
} from './lightColorEventBox.ts';

/** Serialize beatmap v3 `Light Color Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightColorEventBoxGroup(
   data: IWrapLightColorEventBoxGroup,
): ILightColorEventBoxGroup {
   return {
      b: data.time,
      g: data.id,
      e: data.boxes.map((x) => {
         return serializeLightColorEventBox(x);
      }),
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Color Event Box Group` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEventBoxGroup(
   data: ILightColorEventBoxGroup,
): IWrapLightColorEventBoxGroup {
   return createLightColorEventBoxGroup({
      time: data.b,
      id: data.g,
      boxes: data.e?.map((x) => {
         return deserializeLightColorEventBox(x);
      }),
      customData: data.customData,
   });
}
