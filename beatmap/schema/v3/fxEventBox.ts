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
      data: DeepPartial<IFxEventFloatBoxContainer> = {}
   ): DeepPartial<IWrapFxEventBoxAttribute> {
      const d: DeepPartial<IWrapFxEventBoxAttribute> = {
         filter: indexFilter.deserialize(
            data.data?.f ?? this.defaultValue.data.f
         ),
         beatDistribution: data.data?.w ?? this.defaultValue.data.w,
         beatDistributionType: data.data?.d ?? this.defaultValue.data.d,
         fxDistribution: data.data?.s ?? this.defaultValue.data.s,
         fxDistributionType: data.data?.t ?? this.defaultValue.data.t,
         affectFirst: data.data?.b ?? this.defaultValue.data.b,
         easing: data.data?.i ?? this.defaultValue.data.i,
         events: [],
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };

      if (events) {
         for (const n of data.l || []) {
            d._events.push(fxEventFloat.deserialize(events[n]));
         }
      } else {
         d._events = this.defaultValue.eventData.map((json) =>
            fxEventFloat.deserialize
         );
      }
      return d;
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
