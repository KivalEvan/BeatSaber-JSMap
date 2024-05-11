import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { indexFilter } from './indexFilter.ts';
import { lightTranslationEvent } from './lightTranslationEvent.ts';

export const lightTranslationEventBox: ISchemaContainer<
   IWrapLightTranslationEventBoxAttribute,
   ILightTranslationEventBox
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
   } as Required<ILightTranslationEventBox>,
   serialize(
      data: IWrapLightTranslationEventBoxAttribute,
   ): ILightTranslationEventBox {
      return {
         f: indexFilter.serialize(data.filter),
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.gapDistribution,
         t: data.gapDistributionType,
         a: data.axis,
         r: data.flip,
         b: data.affectFirst,
         i: data.easing,
         l: data.events.map(lightTranslationEvent.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<ILightTranslationEventBox> = {},
   ): DeepPartial<IWrapLightTranslationEventBoxAttribute> {
      return {
         filter: indexFilter.deserialize(data.f ?? this.defaultValue.f),
         beatDistribution: data.w ?? this.defaultValue.w,
         beatDistributionType: data.d ?? this.defaultValue.d,
         gapDistribution: data.s ?? this.defaultValue.s,
         gapDistributionType: data.t ?? this.defaultValue.t,
         axis: data.a ?? this.defaultValue.a,
         flip: data.r ?? this.defaultValue.r,
         affectFirst: data.b ?? this.defaultValue.b,
         easing: data.i ?? this.defaultValue.i,
         events: (data.l ?? this.defaultValue.l).map(
            lightTranslationEvent.deserialize,
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapLightTranslationEventBoxAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapLightTranslationEventBoxAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapLightTranslationEventBoxAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapLightTranslationEventBoxAttribute): boolean {
      return false;
   },
};
