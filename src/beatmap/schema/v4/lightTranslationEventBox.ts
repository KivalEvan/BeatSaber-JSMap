import type { ILightTranslationBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightTranslationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightTranslationEvent } from './lightTranslationEvent.ts';

/**
 * Schema serialization for v4 `Light Translation Event Box`.
 */
export const lightTranslationEventBox: ISchemaContainer<
   IWrapLightTranslationEventBoxAttribute,
   ILightTranslationBoxContainer
> = {
   serialize(data) {
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
            return lightTranslationEvent.serialize(x);
         }),
         filterData: indexFilter.serialize(data.filter),
      };
   },
   deserialize(data) {
      return {
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w ?? 0,
         beatDistributionType: data.data?.d ?? 1,
         gapDistribution: data.data?.s ?? 0,
         gapDistributionType: data.data?.t ?? 1,
         affectFirst: data.data?.b ?? 0,
         easing: data.data?.e ?? 0,
         axis: data.data?.a ?? 0,
         flip: data.data?.f ?? 0,
         events: data.eventData?.map((x) => {
            return lightTranslationEvent.deserialize(x);
         }) ?? [],
         customData: data.data?.customData ?? {},
      };
   },
};
