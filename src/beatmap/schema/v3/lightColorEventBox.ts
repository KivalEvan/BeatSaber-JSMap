import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightColorEventBox } from './types/lightColorEventBox.ts';
import type { IWrapLightColorEventBox } from '../../core/types/lightColorEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBox } from '../../core/lightColorEventBox.ts';
import { indexFilter } from './indexFilter.ts';
import { lightColorEvent } from './lightColorEvent.ts';

/**
 * Schema serialization for v3 `Light Color Event Box`.
 */
export const lightColorEventBox: ISchemaContainer<
   IWrapLightColorEventBox,
   ILightColorEventBox
> = {
   serialize(data) {
      return {
         f: indexFilter.serialize(data.filter),
         w: data.beatDistribution,
         d: data.beatDistributionType,
         r: data.brightnessDistribution,
         t: data.brightnessDistributionType,
         b: data.affectFirst,
         i: data.easing,
         e: data.events.map((x) => {
            return lightColorEvent.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createLightColorEventBox({
         filter: indexFilter.deserialize(data.f ?? {}),
         beatDistribution: data.w,
         beatDistributionType: data.d,
         brightnessDistribution: data.r,
         brightnessDistributionType: data.t,
         affectFirst: data.b,
         easing: data.i,
         events: data.e?.map((x) => {
            return lightColorEvent.deserialize(x);
         }),
         customData: data.customData,
      });
   },
};
