import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v3.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventBoxAttribute } from '../../../types/beatmap/wrapper/fxEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { fxEventFloat } from './fxEventFloat.ts';
import { indexFilter } from './indexFilter.ts';

/**
 * Schema serialization for v3 `FX Event Box`.
 */
export const fxEventBox: ISchemaContainer<IWrapFxEventBoxAttribute, IFxEventFloatBoxContainer> = {
   serialize(data: IWrapFxEventBoxAttribute): IFxEventFloatBoxContainer {
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
      return {
         filter: indexFilter.deserialize(data.data?.f ?? {}),
         beatDistribution: data.data?.w ?? 0,
         beatDistributionType: data.data?.d ?? 1,
         fxDistribution: data.data?.s ?? 0,
         fxDistributionType: data.data?.t ?? 1,
         affectFirst: data.data?.b ?? 0,
         easing: data.data?.i ?? 0,
         events: data.eventData?.map((x) => {
            return fxEventFloat.deserialize(x);
         }) ?? [],
         customData: data.data?.customData ?? {},
      };
   },
};
