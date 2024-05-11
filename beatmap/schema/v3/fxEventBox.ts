import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventBoxAttribute } from '../../../types/beatmap/wrapper/fxEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { fxEventFloat } from './fxEventFloat.ts';
import type { IFxEventFloatBoxContainer } from '../../../types/beatmap/container/v3.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';

export const fxEventBox: ISchemaContainer<
   IWrapFxEventBoxAttribute,
   IFxEventFloatBoxContainer
> = {
   defaultValue: {
      data: {
         f: { ...indexFilter.defaultValue },
         w: 0,
         d: 1,
         s: 0,
         t: 1,
         b: 0,
         i: 0,
         l: [],
         customData: {},
      },
      eventData: [],
   } as DeepRequiredIgnore<IFxEventFloatBoxContainer, 'customData'>,
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
         eventData: data.events.map(fxEventFloat.serialize),
      };
   },
   deserialize(
      data: DeepPartial<IFxEventFloatBoxContainer> = {},
   ): DeepPartial<IWrapFxEventBoxAttribute> {
      return {
         filter: indexFilter.deserialize(
            data.data?.f ?? this.defaultValue.data.f,
         ),
         beatDistribution: data.data?.w ?? this.defaultValue.data.w,
         beatDistributionType: data.data?.d ?? this.defaultValue.data.d,
         fxDistribution: data.data?.s ?? this.defaultValue.data.s,
         fxDistributionType: data.data?.t ?? this.defaultValue.data.t,
         affectFirst: data.data?.b ?? this.defaultValue.data.b,
         easing: data.data?.i ?? this.defaultValue.data.i,
         events: (data.eventData ?? this.defaultValue.eventData).map(fxEventFloat.deserialize),
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData,
         ),
      };
   },
   isValid(_: IWrapFxEventBoxAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapFxEventBoxAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapFxEventBoxAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapFxEventBoxAttribute): boolean {
      return false;
   },
};
