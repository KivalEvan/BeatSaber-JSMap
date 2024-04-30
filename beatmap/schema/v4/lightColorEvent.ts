import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightColorEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapLightColorEventAttribute } from '../../../types/beatmap/wrapper/lightColorEvent.ts';
import type { DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { DeepPartial } from '../../../types/utils.ts';

export const lightColorEvent: ISchemaContainer<
   IWrapLightColorEventAttribute,
   ILightColorEventContainer
> = {
   defaultValue: {
      data: {
         p: 0,
         c: 0,
         e: 0,
         b: 0,
         f: 0,
         sb: 0,
         sf: 0,
         customData: {},
      },
      time: 0,
   } as DeepRequiredIgnore<ILightColorEventContainer, 'customData'>,
   serialize(data: IWrapLightColorEventAttribute): ILightColorEventContainer {
      return {
         data: {
            p: data.previous,
            c: data.color,
            e: data.easing,
            b: data.brightness,
            f: data.frequency,
            sb: data.strobeBrightness,
            sf: data.strobeFade,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(
      data: DeepPartial<ILightColorEventContainer> = {}
   ): Partial<IWrapLightColorEventAttribute> {
      return {
         time: data.time ?? this.defaultValue.time,
         previous: data.data?.p ?? this.defaultValue.data.p,
         color: data.data?.c ?? this.defaultValue.data.c,
         frequency: data.data?.f ?? this.defaultValue.data.f,
         easing: data.data?.e ?? this.defaultValue.data.e,
         brightness: data.data?.b ?? this.defaultValue.data.b,
         strobeBrightness: data.data?.sb ?? this.defaultValue.data.sb,
         strobeFade: data.data?.sf ?? this.defaultValue.data.sf,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData
         ),
      };
   },
   isValid(data: IWrapLightColorEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightColorEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightColorEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapLightColorEventAttribute): boolean {
      return false;
   },
};
