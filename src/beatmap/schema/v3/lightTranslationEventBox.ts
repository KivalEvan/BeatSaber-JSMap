import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBox } from '../../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBox } from '../../core/lightTranslationEventBox.ts';
import { indexFilter } from './indexFilter.ts';
import { lightTranslationEvent } from './lightTranslationEvent.ts';

/**
 * Schema serialization for v3 `Light Translation Event Box`.
 */
export const lightTranslationEventBox: ISchemaContainer<
   IWrapLightTranslationEventBox,
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
      return createLightTranslationEventBox({
         filter: indexFilter.deserialize(data.f ?? {}),
         beatDistribution: data.w,
         beatDistributionType: data.d,
         gapDistribution: data.s,
         gapDistributionType: data.t,
         axis: data.a,
         flip: data.r,
         affectFirst: data.b,
         easing: data.i,
         events: data.l?.map((x) => {
            return lightTranslationEvent.deserialize(x);
         }),
         customData: data.customData,
      });
   },
};
