import type { IFxEventFloatBoxContainer } from './types/container.ts';
import type { IWrapFxEventBox } from '../wrapper/types/fxEventBox.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBox } from '../wrapper/fxEventBox.ts';
import { deserializeFxEventFloat, serializeFxEventFloat } from './fxEventFloat.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';

/** Serialize beatmap v3 `Fx Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeFxEventBox(data: IWrapFxEventBox): IFxEventFloatBoxContainer {
   return {
      data: {
         f: serializeIndexFilter(data.filter),
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.fxDistribution,
         t: data.fxDistributionType,
         b: data.affectFirst,
         i: data.easing,
         l: [],
         customData: deepCopy(data.customData),
      },
      eventData: data.events.map((x) => {
         return serializeFxEventFloat(x);
      }),
   };
}

/** Deserialize schema object into beatmap v3 `Fx Event Box` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeFxEventBox(
   data: IFxEventFloatBoxContainer,
   options?: DeserializationOptions,
): IWrapFxEventBox {
   return createFxEventBox({
      filter: deserializeIndexFilter(data.data?.f ?? {}, options),
      beatDistribution: data.data?.w,
      beatDistributionType: data.data?.d,
      fxDistribution: data.data?.s,
      fxDistributionType: data.data?.t,
      affectFirst: data.data?.b,
      easing: data.data?.i,
      events: data.eventData?.map((x) => {
         return deserializeFxEventFloat(x, options);
      }),
      customData: data.data?.customData,
   }, options);
}
