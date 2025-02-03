import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventBoxAttribute } from '../../../types/beatmap/wrapper/fxEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { fxEventFloat } from './fxEventFloat.ts';
import { indexFilter } from './indexFilter.ts';

/**
 * Schema serialization for v4 `FX Event Box`.
 */
export const fxEventBox: ISchemaContainer<IWrapFxEventBoxAttribute, IFxEventFloatBoxContainer> = {
   serialize(data) {
      return {
         data: {
            w: data.beatDistribution,
            d: data.beatDistributionType,
            s: data.fxDistribution,
            t: data.fxDistributionType,
            b: data.affectFirst,
            e: data.easing,
            customData: deepCopy(data.customData),
         },
         eventData: data.events.map((x) => {
            return fxEventFloat.serialize(x);
         }),
         filterData: indexFilter.serialize(data.filter),
      };
   },
   deserialize(data) {
      return {
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w ?? 0,
         beatDistributionType: data.data?.d ?? 1,
         fxDistribution: data.data?.s ?? 0,
         fxDistributionType: data.data?.t ?? 1,
         affectFirst: data.data?.b ?? 0,
         easing: data.data?.e ?? 0,
         events: data.eventData?.map((x) => {
            return fxEventFloat.deserialize(x);
         }),
         customData: data.data?.customData ?? {},
      };
   },
};
