import type { ILightColorBoxContainer } from './types/container.ts';
import type { IWrapLightColorEventBox } from '../wrapper/types/lightColorEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBox } from '../wrapper/lightColorEventBox.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';
import { deserializeLightColorEvent, serializeLightColorEvent } from './lightColorEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `Light Color Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightColorEventBox(
   data: IWrapLightColorEventBox,
): ILightColorBoxContainer {
   return {
      data: {
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.brightnessDistribution,
         t: data.brightnessDistributionType,
         b: data.affectFirst,
         e: data.easing,
         customData: deepCopy(data.customData),
      },
      eventData: data.events.map((x) => {
         return serializeLightColorEvent(x);
      }),
      filterData: serializeIndexFilter(data.filter),
   };
}

/** Deserialize schema object into beatmap v4 `Light Color Event Box` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEventBox(
   data: ILightColorBoxContainer,
   options?: DeserializationOptions,
): IWrapLightColorEventBox {
   return createLightColorEventBox({
      filter: deserializeIndexFilter(data.filterData ?? {}, options),
      beatDistribution: data.data?.w,
      beatDistributionType: data.data?.d,
      brightnessDistribution: data.data?.s,
      brightnessDistributionType: data.data?.t,
      affectFirst: data.data?.b,
      easing: data.data?.e,
      events: data.eventData?.map((x) => {
         return deserializeLightColorEvent(x, options);
      }),
      customData: data.data?.customData,
   }, options);
}
