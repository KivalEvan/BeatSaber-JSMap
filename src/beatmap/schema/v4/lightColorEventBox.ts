import type { ILightColorBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightColorEventBoxAttribute } from '../../../types/beatmap/wrapper/lightColorEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightColorEvent } from './lightColorEvent.ts';

/**
 * Schema serialization for v4 `Light Color Event Box`.
 */
export const lightColorEventBox: ISchemaContainer<
   IWrapLightColorEventBoxAttribute,
   ILightColorBoxContainer
> = {
   serialize(data) {
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
            return lightColorEvent.serialize(x);
         }),
         filterData: indexFilter.serialize(data.filter),
      };
   },
   deserialize(data) {
      return {
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w ?? 0,
         beatDistributionType: data.data?.d ?? 1,
         brightnessDistribution: data.data?.s ?? 0,
         brightnessDistributionType: data.data?.t ?? 1,
         affectFirst: data.data?.b ?? 0,
         easing: data.data?.e ?? 0,
         events: data.eventData?.map((x) => {
            return lightColorEvent.deserialize(x);
         }) ?? [],
         customData: data.data?.customData ?? {},
      };
   },
};
