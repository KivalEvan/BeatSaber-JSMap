import type { ILightRotationBoxContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightRotationEventBox } from '../wrapper/types/lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { indexFilter } from './indexFilter.ts';
import { lightRotationEvent } from './lightRotationEvent.ts';

/**
 * Schema serialization for v4 `Light Rotation Event Box`.
 */
export const lightRotationEventBox: ISchemaContainer<
   IWrapLightRotationEventBox,
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
      return createLightRotationEventBox({
         filter: indexFilter.deserialize(data.filterData ?? {}),
         beatDistribution: data.data?.w,
         beatDistributionType: data.data?.d,
         rotationDistribution: data.data?.s,
         rotationDistributionType: data.data?.t,
         affectFirst: data.data?.b,
         easing: data.data?.e,
         axis: data.data?.a,
         flip: data.data?.f,
         events: data.eventData?.map((x) => {
            return lightRotationEvent.deserialize(x);
         }),
         customData: data.data?.customData,
      });
   },
};
