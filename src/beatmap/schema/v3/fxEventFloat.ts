import type { IFxEventFloat } from './types/fxEventFloat.ts';
import type { IWrapFxEventFloat } from '../wrapper/types/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventFloat } from '../wrapper/fxEventFloat.ts';

/** Serialize beatmap v3 `Fx Event Float` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeFxEventFloat(data: IWrapFxEventFloat): IFxEventFloat {
   return {
      b: data.time,
      i: data.easing,
      p: data.previous,
      v: data.value,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Fx Event Float` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeFxEventFloat(data: IFxEventFloat): IWrapFxEventFloat {
   return createFxEventFloat({
      time: data.b,
      easing: data.i,
      previous: data.p,
      value: data.v,
      customData: data.customData,
   });
}
