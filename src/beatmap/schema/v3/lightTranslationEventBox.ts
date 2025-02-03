import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightTranslationEvent } from './lightTranslationEvent.ts';

/**
 * Schema serialization for v3 `Light Translation Event Box`.
 */
export const lightTranslationEventBox: ISchemaContainer<
   IWrapLightTranslationEventBoxAttribute,
   ILightTranslationEventBox
> = {
   serialize(data) {
      return {
         f: indexFilter.serialize(data.filter),
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.gapDistribution,
         t: data.gapDistributionType,
         a: data.axis,
         r: data.flip,
         b: data.affectFirst,
         i: data.easing,
         l: data.events.map((x) => {
            return lightTranslationEvent.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         filter: indexFilter.deserialize(data.f ?? {}),
         beatDistribution: data.w ?? 0,
         beatDistributionType: data.d ?? 1,
         gapDistribution: data.s ?? 0,
         gapDistributionType: data.t ?? 1,
         axis: data.a ?? 0,
         flip: data.r ?? 0,
         affectFirst: data.b ?? 0,
         easing: data.i ?? 0,
         events: data.l?.map((x) => {
            return lightTranslationEvent.deserialize(x);
         }) ?? [],
         customData: data.customData ?? {},
      };
   },
};
