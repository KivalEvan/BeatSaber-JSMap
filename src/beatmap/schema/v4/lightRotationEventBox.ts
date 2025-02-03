import type { ILightRotationBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightRotationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightRotationEvent } from './lightRotationEvent.ts';

/**
 * Schema serialization for v4 `Light Rotation Event Box`.
 */
export const lightRotationEventBox: ISchemaContainer<
   IWrapLightRotationEventBoxAttribute,
   ILightRotationBoxContainer
> = {
   serialize(data) {
      return {
         data: {
            w: data.beatDistribution,
            d: data.beatDistributionType,
            s: data.rotationDistribution,
            t: data.rotationDistributionType,
            b: data.affectFirst,
            e: data.easing,
            a: data.axis,
            f: data.flip,
            customData: deepCopy(data.customData),
         },
         eventData: data.events.map((x) => {
            return lightRotationEvent.serialize(x);
         }),
         filterData: indexFilter.serialize(data.filter),
      };
   },
   deserialize(data) {
      return {
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w ?? 0,
         beatDistributionType: data.data?.d ?? 1,
         rotationDistribution: data.data?.s ?? 0,
         rotationDistributionType: data.data?.t ?? 1,
         affectFirst: data.data?.b ?? 0,
         easing: data.data?.e ?? 0,
         axis: data.data?.a ?? 0,
         flip: data.data?.f ?? 0,
         events: data.eventData?.map((x) => {
            return lightRotationEvent.deserialize(x);
         }) ?? [],
         customData: data.data?.customData ?? {},
      };
   },
};
