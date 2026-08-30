import type { ILightColorEventBox } from './types/lightColorEventBox.ts';
import type { IWrapLightColorEventBox } from '../wrapper/types/lightColorEventBox.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBox } from '../wrapper/lightColorEventBox.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';
import { deserializeLightColorEvent, serializeLightColorEvent } from './lightColorEvent.ts';

/** Serialize beatmap v3 `Light Color Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightColorEventBox(data: IWrapLightColorEventBox): ILightColorEventBox {
   return {
      f: serializeIndexFilter(data.filter),
      w: data.beatDistribution,
      d: data.beatDistributionType,
      r: data.brightnessDistribution,
      t: data.brightnessDistributionType,
      b: data.affectFirst,
      i: data.easing,
      e: data.events.map((x) => {
         return serializeLightColorEvent(x);
      }),
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Color Event Box` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEventBox(
   data: ILightColorEventBox,
   options?: DeserializationOptions,
): IWrapLightColorEventBox {
   return createLightColorEventBox({
      filter: deserializeIndexFilter(data.f ?? {}, options),
      beatDistribution: data.w,
      beatDistributionType: data.d,
      brightnessDistribution: data.r,
      brightnessDistributionType: data.t,
      affectFirst: data.b,
      easing: data.i,
      events: data.e?.map((x) => {
         return deserializeLightColorEvent(x, options);
      }),
      customData: data.customData,
   }, options);
}
