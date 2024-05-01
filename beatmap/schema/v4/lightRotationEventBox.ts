import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapLightRotationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBox.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightRotationEvent } from './lightRotationEvent.ts';

export const lightRotationEventBox: ISchemaContainer<
   IWrapLightRotationEventBoxAttribute,
   ILightRotationBoxContainer
> = {
   defaultValue: {
      data: {
         w: 0,
         d: 1,
         s: 0,
         t: 1,
         b: 0,
         e: 0,
         f: 0,
         a: 0,
         customData: {},
      },
      eventData: [],
      filterData: { ...indexFilter.defaultValue },
   } as DeepRequiredIgnore<ILightRotationBoxContainer, 'customData'>,
   serialize(
      data: IWrapLightRotationEventBoxAttribute,
   ): ILightRotationBoxContainer {
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
         eventData: data.events.map(lightRotationEvent.serialize),
         filterData: indexFilter.serialize(data.filter),
      };
   },
   deserialize(
      data: DeepPartial<ILightRotationBoxContainer> = {},
   ): DeepPartial<IWrapLightRotationEventBoxAttribute> {
      return {
         filter: indexFilter.deserialize(
            data.filterData ?? this.defaultValue.filterData,
         ),
         beatDistribution: data.data?.w ?? this.defaultValue.data.w,
         beatDistributionType: data.data?.d ?? this.defaultValue.data.d,
         rotationDistribution: data.data?.s ?? this.defaultValue.data.s,
         rotationDistributionType: data.data?.t ?? this.defaultValue.data.t,
         affectFirst: data.data?.b ?? this.defaultValue.data.b,
         easing: data.data?.e ?? this.defaultValue.data.e,
         axis: data.data?.a ?? this.defaultValue.data.a,
         flip: data.data?.f ?? this.defaultValue.data.f,
         events: (data.eventData ?? this.defaultValue.eventData).map(
            lightRotationEvent.deserialize,
         ),
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData,
         ),
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
