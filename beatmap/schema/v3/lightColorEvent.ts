import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v3/lightColorEvent.ts';
import type { IWrapLightColorEventAttribute } from '../../../types/beatmap/wrapper/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const lightColorEvent: ISchemaContainer<
   IWrapLightColorEventAttribute,
   ILightColorEvent
> = {
   defaultValue: {
      b: 0,
      i: 0,
      c: 0,
      s: 0,
      f: 0,
      sb: 0,
      sf: 0,
      customData: {},
   } as Required<ILightColorEvent>,
   serialize(data: IWrapLightColorEventAttribute): ILightColorEvent {
      return {
         b: data.time,
         c: data.color,
         f: data.frequency,
         i: data.transition,
         s: data.brightness,
         sb: data.strobeBrightness,
         sf: data.strobeFade,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<ILightColorEvent> = {}
   ): Partial<IWrapLightColorEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         color: data.c ?? this.defaultValue.c,
         frequency: data.f ?? this.defaultValue.f,
         transition: data.i ?? this.defaultValue.i,
         brightness: data.s ?? this.defaultValue.s,
         strobeBrightness: data.sb ?? this.defaultValue.sb,
         strobeFade: data.sf ?? this.defaultValue.sf,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
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
