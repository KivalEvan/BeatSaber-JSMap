import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapFxEventBoxAttribute } from '../../../types/beatmap/wrapper/fxEventBox.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { fxEventFloat } from './fxEventFloat.ts';

export const fxEventBox: ISchemaContainer<
   IWrapFxEventBoxAttribute,
   IFxEventFloatBoxContainer
> = {
   defaultValue: {
      data: {
         w: 0,
         d: 1,
         s: 0,
         t: 1,
         b: 0,
         e: 0,
         customData: {},
      },
      eventData: [],
      filterData: { ...indexFilter.defaultValue },
   } as DeepRequiredIgnore<IFxEventFloatBoxContainer, 'customData'>,
   serialize(data: IWrapFxEventBoxAttribute): IFxEventFloatBoxContainer {
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
         eventData: data.events.map(fxEventFloat.serialize),
         filterData: indexFilter.serialize(data.filter),
      };
   },
   deserialize(
      data: DeepPartial<IFxEventFloatBoxContainer> = {}
   ): DeepPartial<IWrapFxEventBoxAttribute> {
      return {
         filter: indexFilter.deserialize(
            data.filterData ?? this.defaultValue.filterData
         ),
         beatDistribution: data.data?.w ?? this.defaultValue.data.w,
         beatDistributionType: data.data?.d ?? this.defaultValue.data.d,
         fxDistribution: data.data?.s ?? this.defaultValue.data.s,
         fxDistributionType: data.data?.t ?? this.defaultValue.data.t,
         affectFirst: data.data?.b ?? this.defaultValue.data.b,
         easing: data.data?.e ?? this.defaultValue.data.e,
         events: (data.eventData ?? this.defaultValue.eventData).map(
            fxEventFloat.deserialize
         ),
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapFxEventBoxAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapFxEventBoxAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapFxEventBoxAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapFxEventBoxAttribute): boolean {
      return false;
   },
};