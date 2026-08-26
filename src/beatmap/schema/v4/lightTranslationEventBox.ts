import type { ILightTranslationBoxContainer } from './types/container.ts';
import type { IWrapLightTranslationEventBox } from '../wrapper/types/lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBox } from '../wrapper/lightTranslationEventBox.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';
import {
   deserializeLightTranslationEvent,
   serializeLightTranslationEvent,
} from './lightTranslationEvent.ts';

/** Serialize beatmap v4 `Light Translation Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightTranslationEventBox(
   data: IWrapLightTranslationEventBox,
): ILightTranslationBoxContainer {
   return {
      data: {
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.gapDistribution,
         t: data.gapDistributionType,
         b: data.affectFirst,
         e: data.easing,
         a: data.axis,
         f: data.flip,
         customData: deepCopy(data.customData),
      },
      eventData: data.events.map((x) => {
         return serializeLightTranslationEvent(x);
      }),
      filterData: serializeIndexFilter(data.filter),
   };
}

/** Deserialize schema object into beatmap v4 `Light Translation Event Box` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightTranslationEventBox(
   data: ILightTranslationBoxContainer,
): IWrapLightTranslationEventBox {
   return createLightTranslationEventBox({
      filter: deserializeIndexFilter(data.filterData ?? {}),
      beatDistribution: data.data?.w,
      beatDistributionType: data.data?.d,
      gapDistribution: data.data?.s,
      gapDistributionType: data.data?.t,
      affectFirst: data.data?.b,
      easing: data.data?.e,
      axis: data.data?.a,
      flip: data.data?.f,
      events: data.eventData?.map((x) => {
         return deserializeLightTranslationEvent(x);
      }),
      customData: data.data?.customData,
   });
}
