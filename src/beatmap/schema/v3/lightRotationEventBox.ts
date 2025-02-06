import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEventBox } from '../../../types/beatmap/v3/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBox } from '../../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createLightRotationEventBox } from '../../core/lightRotationEventBox.ts';
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
