import type { IFxEventFloatContainer } from './types/container.ts';
import type { IWrapFxEventFloat } from '../wrapper/types/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventFloat } from '../wrapper/fxEventFloat.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `Fx Event Float` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeFxEventFloat(data: IWrapFxEventFloat): IFxEventFloatContainer {
   return {
      data: {
         p: data.previous,
         e: data.easing,
         v: data.value,
         customData: deepCopy(data.customData),
      },
      time: data.time,
   };
}

/** Deserialize schema object into beatmap v4 `Fx Event Float` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeFxEventFloat(
   data: IFxEventFloatContainer,
   options?: DeserializationOptions,
): IWrapFxEventFloat {
   return createFxEventFloat({
      time: data.time,
      previous: data.data?.p,
      easing: data.data?.e,
      value: data.data?.v,
      customData: data.data?.customData,
   }, options);
}
