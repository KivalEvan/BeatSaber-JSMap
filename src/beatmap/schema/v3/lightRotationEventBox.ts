import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightRotationEventBox } from './types/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBox } from '../wrapper/types/lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { indexFilter } from './indexFilter.ts';
import { lightRotationEvent } from './lightRotationEvent.ts';

/**
 * Schema serialization for v3 `Light Rotation Event Box`.
 */
export const lightRotationEventBox: ISchemaContainer<
   IWrapLightRotationEventBox,
   ILightRotationEventBox
> = {
   serialize(data) {
      return {
         f: indexFilter.serialize(data.filter),
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.rotationDistribution,
         t: data.rotationDistributionType,
         a: data.axis,
         r: data.flip,
         b: data.affectFirst,
         i: data.easing,
         l: data.events.map((x) => {
            return lightRotationEvent.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createLightRotationEventBox({
         filter: indexFilter.deserialize(data.f ?? {}),
         beatDistribution: data.w,
         beatDistributionType: data.d,
         rotationDistribution: data.s,
         rotationDistributionType: data.t,
         axis: data.a,
         flip: data.r,
         affectFirst: data.b,
         easing: data.i,
         events: data.l?.map((x) => {
            return lightRotationEvent.deserialize(x);
         }),
         customData: data.customData,
      });
   },
};
