import type { ILightColorBoxContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightColorEventBox } from '../wrapper/types/lightColorEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBox } from '../wrapper/lightColorEventBox.ts';
import { indexFilter } from './indexFilter.ts';
import { lightColorEvent } from './lightColorEvent.ts';

/**
 * Schema serialization for v4 `Light Color Event Box`.
 */
export const lightColorEventBox: ISchemaContainer<
   IWrapLightColorEventBox,
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
      return createLightColorEventBox({
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w,
         beatDistributionType: data.data?.d,
         brightnessDistribution: data.data?.s,
         brightnessDistributionType: data.data?.t,
         affectFirst: data.data?.b,
         easing: data.data?.e,
         events: data.eventData?.map((x) => {
            return lightColorEvent.deserialize(x);
         }),
         customData: data.data?.customData,
      });
   },
};
