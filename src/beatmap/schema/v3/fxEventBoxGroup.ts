import type { IEventBoxGroupContainer, IFxEventFloatBoxContainer } from './types/container.ts';
import { FxType } from '../shared/types/constants.ts';
import type { IFxEventBox } from './types/fxEventBox.ts';
import type { IWrapFxEventBoxGroup } from '../wrapper/types/fxEventBoxGroup.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBoxGroup } from '../wrapper/fxEventBoxGroup.ts';
import { deserializeFxEventBox, serializeFxEventBox } from './fxEventBox.ts';

/** Serialize beatmap v3 `Fx Event Box Group` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeFxEventBoxGroup(
   data: IWrapFxEventBoxGroup,
): IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer> {
   return {
      object: {
         t: FxType.FLOAT,
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

/** Deserialize schema object into beatmap v3 `Fx Event Box Group` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeFxEventBoxGroup(
   data: IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>,
   options?: DeserializationOptions,
): IWrapFxEventBoxGroup {
   return createFxEventBoxGroup({
      time: data.object?.b,
      id: data.object?.g,
      boxes: data.boxData?.map((x) => {
         return deserializeFxEventBox(x, options);
      }),
      customData: data.object?.customData,
   }, options);
}
