import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEventBox } from '../../../types/beatmap/v3/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightRotationEvent } from './lightRotationEvent.ts';

/**
 * Schema serialization for v3 `Light Rotation Event Box`.
 */
export const lightRotationEventBox: ISchemaContainer<
   IWrapLightRotationEventBoxAttribute,
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
      return {
         filter: indexFilter.deserialize(data.f ?? {}),
         beatDistribution: data.w ?? 0,
         beatDistributionType: data.d ?? 1,
         rotationDistribution: data.s ?? 0,
         rotationDistributionType: data.t ?? 1,
         axis: data.a ?? 0,
         flip: data.r ?? 0,
         affectFirst: data.b ?? 0,
         easing: data.i ?? 0,
         events: data.l?.map((x) => {
            return lightRotationEvent.deserialize(x);
         }) ?? [],
         customData: data.customData ?? {},
      };
   },
};
