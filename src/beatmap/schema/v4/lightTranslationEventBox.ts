import type { ILightTranslationBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightTranslationEventBox } from '../../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBox } from '../../core/lightTranslationEventBox.ts';
import { indexFilter } from './indexFilter.ts';
import { lightTranslationEvent } from './lightTranslationEvent.ts';

/**
 * Schema serialization for v4 `Light Translation Event Box`.
 */
export const lightTranslationEventBox: ISchemaContainer<
   IWrapLightTranslationEventBox,
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
      return createLightTranslationEventBox({
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w,
         beatDistributionType: data.data?.d,
         gapDistribution: data.data?.s,
         gapDistributionType: data.data?.t,
         affectFirst: data.data?.b,
         easing: data.data?.e,
         axis: data.data?.a,
         flip: data.data?.f,
         events: data.eventData?.map((x) => {
            return lightTranslationEvent.deserialize(x);
         }),
         customData: data.data?.customData,
      });
   },
};
