import type { IFxEventInt } from './types/fxEventInt.ts';
import type { IWrapFxEventInt } from '../wrapper/types/fxEventInt.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventInt } from '../wrapper/fxEventInt.ts';

/** Serialize beatmap v3 `Fx Event Int` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeFxEventInt(data: IWrapFxEventInt): IFxEventInt {
   return {
      b: data.time,
      p: data.previous,
      v: data.value,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Fx Event Int` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeFxEventInt(
   data: IFxEventInt,
   options?: DeserializationOptions,
): IWrapFxEventInt {
   return createFxEventInt({
      time: data.b,
      previous: data.p,
      value: data.v,
      customData: data.customData,
   }, options);
}
