import type { ILightTranslationEventBox } from './types/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBox } from '../wrapper/types/lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBox } from '../wrapper/lightTranslationEventBox.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';
import {
   deserializeLightTranslationEvent,
   serializeLightTranslationEvent,
} from './lightTranslationEvent.ts';

/** Serialize beatmap v3 `Light Translation Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightTranslationEventBox(
   data: IWrapLightTranslationEventBox,
): ILightTranslationEventBox {
   return {
      f: serializeIndexFilter(data.filter),
      w: data.beatDistribution,
      d: data.beatDistributionType,
      s: data.gapDistribution,
      t: data.gapDistributionType,
      a: data.axis,
      r: data.flip,
      b: data.affectFirst,
      i: data.easing,
      l: data.events.map((x) => {
         return serializeLightTranslationEvent(x);
      }),
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Translation Event Box` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightTranslationEventBox(
   data: ILightTranslationEventBox,
): IWrapLightTranslationEventBox {
   return createLightTranslationEventBox({
      filter: deserializeIndexFilter(data.f ?? {}),
      beatDistribution: data.w,
      beatDistributionType: data.d,
      gapDistribution: data.s,
      gapDistributionType: data.t,
      axis: data.a,
      flip: data.r,
      affectFirst: data.b,
      easing: data.i,
      events: data.l?.map((x) => {
         return deserializeLightTranslationEvent(x);
      }),
      customData: data.customData,
   });
}
