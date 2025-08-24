import type { IFxEventFloatBoxContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapFxEventBox } from '../wrapper/types/fxEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBox } from '../wrapper/fxEventBox.ts';
import { fxEventFloat } from './fxEventFloat.ts';
import { indexFilter } from './indexFilter.ts';

/**
 * Schema serialization for v3 `FX Event Box`.
 */
export const fxEventBox: ISchemaContainer<IWrapFxEventBox, IFxEventFloatBoxContainer> = {
   serialize(data) {
      return {
         data: {
            f: indexFilter.serialize(data.filter),
            w: data.beatDistribution,
            d: data.beatDistributionType,
            s: data.fxDistribution,
            t: data.fxDistributionType,
            b: data.affectFirst,
            i: data.easing,
            l: [],
            customData: deepCopy(data.customData),
         },
         eventData: data.events.map((x) => {
            return fxEventFloat.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return createFxEventBox({
         filter: indexFilter.deserialize(data.data?.f ?? {}),
         beatDistribution: data.data?.w,
         beatDistributionType: data.data?.d,
         fxDistribution: data.data?.s,
         fxDistributionType: data.data?.t,
         affectFirst: data.data?.b,
         easing: data.data?.i,
         events: data.eventData?.map((x) => {
            return fxEventFloat.deserialize(x);
         }),
         customData: data.data?.customData,
      });
   },
};
