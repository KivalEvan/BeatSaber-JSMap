import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightColorEventBox } from '../../../types/beatmap/v3/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxAttribute } from '../../../types/beatmap/wrapper/lightColorEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightColorEvent } from './lightColorEvent.ts';

/**
 * Schema serialization for v3 `Light Color Event Box`.
 */
export const lightColorEventBox: ISchemaContainer<
   IWrapLightColorEventBoxAttribute,
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
      return {
         filter: indexFilter.deserialize(data.f ?? {}),
         beatDistribution: data.w ?? 0,
         beatDistributionType: data.d ?? 1,
         brightnessDistribution: data.r ?? 0,
         brightnessDistributionType: data.t ?? 1,
         affectFirst: data.b ?? 0,
         easing: data.i ?? 0,
         events: data.e?.map((x) => {
            return lightColorEvent.deserialize(x);
         }) ?? [],
         customData: data.customData ?? {},
      };
   },
};
