import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v3/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventAttribute } from '../../../types/beatmap/wrapper/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const lightTranslationEvent: ISchemaContainer<
   IWrapLightTranslationEventAttribute,
   ILightTranslationEvent
> = {
   defaultValue: {
      b: 0,
      p: 0,
      e: 0,
      t: 0,
      customData: {},
   } as Required<ILightTranslationEvent>,
   serialize(
      data: IWrapLightTranslationEventAttribute
   ): ILightTranslationEvent {
      return {
         b: data.time,
         e: data.easing,
         p: data.previous,
         t: data.translation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<ILightTranslationEvent> = {}
   ): Partial<IWrapLightTranslationEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         easing: data.e ?? this.defaultValue.e,
         previous: data.p ?? this.defaultValue.p,
         translation: data.t ?? this.defaultValue.t,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapLightTranslationEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightTranslationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightTranslationEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapLightTranslationEventAttribute): boolean {
      return false;
   },
};
