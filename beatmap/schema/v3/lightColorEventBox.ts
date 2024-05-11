import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightColorEventBox } from '../../../types/beatmap/v3/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxAttribute } from '../../../types/beatmap/wrapper/lightColorEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightColorEvent } from './lightColorEvent.ts';

export const lightColorEventBox: ISchemaContainer<
   IWrapLightColorEventBoxAttribute,
   ILightColorEventBox
> = {
   defaultValue: {
      f: { ...indexFilter.defaultValue },
      w: 0,
      d: 1,
      r: 0,
      t: 1,
      b: 0,
      i: 0,
      e: [],
      customData: {},
   } as Required<ILightColorEventBox>,
   serialize(data: IWrapLightColorEventBoxAttribute): ILightColorEventBox {
      return {
         f: indexFilter.serialize(data.filter),
         w: data.beatDistribution,
         d: data.beatDistributionType,
         r: data.brightnessDistribution,
         t: data.brightnessDistributionType,
         b: data.affectFirst,
         i: data.easing,
         e: data.events.map(lightColorEvent.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<ILightColorEventBox> = {},
   ): DeepPartial<IWrapLightColorEventBoxAttribute> {
      return {
         filter: indexFilter.deserialize(data.f ?? this.defaultValue.f),
         beatDistribution: data.w ?? this.defaultValue.w,
         beatDistributionType: data.d ?? this.defaultValue.d,
         brightnessDistribution: data.r ?? this.defaultValue.r,
         brightnessDistributionType: data.t ?? this.defaultValue.t,
         affectFirst: data.b ?? this.defaultValue.b,
         easing: data.i ?? this.defaultValue.i,
         events: (data.e ?? this.defaultValue.e).map(
            lightColorEvent.deserialize,
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapLightColorEventBoxAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapLightColorEventBoxAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapLightColorEventBoxAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapLightColorEventBoxAttribute): boolean {
      return false;
   },
};
