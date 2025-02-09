import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventBox } from '../../../types/beatmap/wrapper/fxEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBox } from '../../core/fxEventBox.ts';
import { fxEventFloat } from './fxEventFloat.ts';
import { indexFilter } from './indexFilter.ts';

/**
 * Schema serialization for v4 `FX Event Box`.
 */
export const fxEventBox: ISchemaContainer<IWrapFxEventBox, IFxEventFloatBoxContainer> = {
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
      return createFxEventBox({
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w,
         beatDistributionType: data.data?.d,
         fxDistribution: data.data?.s,
         fxDistributionType: data.data?.t,
         affectFirst: data.data?.b,
         easing: data.data?.e,
         events: data.eventData?.map((x) => {
            return fxEventFloat.deserialize(x);
         }),
         customData: data.data?.customData,
      });
   },
};
