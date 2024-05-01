import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEventBox } from '../../../types/beatmap/v3/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightRotationEvent } from './lightRotationEvent.ts';

export const lightRotationEventBox: ISchemaContainer<
   IWrapLightRotationEventBoxAttribute,
   ILightRotationEventBox
> = {
   defaultValue: {
      f: { ...indexFilter.defaultValue },
      w: 0,
      d: 1,
      s: 0,
      t: 1,
      a: 0,
      r: 0,
      b: 0,
      i: 0,
      l: [],
      customData: {},
   } as Required<ILightRotationEventBox>,
   serialize(
      data: IWrapLightRotationEventBoxAttribute,
   ): ILightRotationEventBox {
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
         l: data.events.map(lightRotationEvent.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<ILightRotationEventBox> = {},
   ): DeepPartial<IWrapLightRotationEventBoxAttribute> {
      return {
         filter: indexFilter.deserialize(data.f ?? this.defaultValue.f),
         beatDistribution: data.w ?? this.defaultValue.w,
         beatDistributionType: data.d ?? this.defaultValue.d,
         rotationDistribution: data.s ?? this.defaultValue.s,
         rotationDistributionType: data.t ?? this.defaultValue.t,
         axis: data.a ?? this.defaultValue.a,
         flip: data.r ?? this.defaultValue.r,
         affectFirst: data.b ?? this.defaultValue.b,
         easing: data.i ?? this.defaultValue.i,
         events: (data.l ?? this.defaultValue.l).map(
            lightRotationEvent.deserialize,
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapLightRotationEventBoxAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightRotationEventBoxAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightRotationEventBoxAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapLightRotationEventBoxAttribute): boolean {
      return false;
   },
};
