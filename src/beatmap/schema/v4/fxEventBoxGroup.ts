import type { IEventBoxGroupContainer, IFxEventFloatBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { IWrapFxEventBoxGroup } from '../wrapper/types/fxEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBoxGroup } from '../wrapper/fxEventBoxGroup.ts';
import { deserializeFxEventBox, serializeFxEventBox } from './fxEventBox.ts';

/** Serialize beatmap v4 `Fx Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeFxEventBoxGroup(
   data: IWrapFxEventBoxGroup,
): IEventBoxGroupContainer<IFxEventFloatBoxContainer> {
   return {
      object: {
         t: EventBoxType.FX_FLOAT,
         b: data.time,
         g: data.id,
         e: [],
         customData: deepCopy(data.customData),
      },
      boxData: data.boxes.map((x) => {
         return serializeFxEventBox(x);
      }),
   };
}

/** Deserialize schema object into beatmap v4 `Fx Event Box Group` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeFxEventBoxGroup(
   data: IEventBoxGroupContainer<IFxEventFloatBoxContainer>,
): IWrapFxEventBoxGroup {
   return createFxEventBoxGroup({
      time: data.object?.b,
      id: data.object?.g,
      boxes: data.boxData?.map((x) => {
         return deserializeFxEventBox(x);
      }),
      customData: data.object?.customData,
   });
}
