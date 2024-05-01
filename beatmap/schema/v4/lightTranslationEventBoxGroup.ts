import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type { IEventBoxGroupContainer } from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ILightTranslationBoxContainer } from '../../../types/beatmap/container/v4.ts';

export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroupAttribute,
   IEventBoxGroupContainer<ILightTranslationBoxContainer>
> = {
   defaultValue: {
      object: {
         t: EventBoxType.TRANSLATION,
         b: 0,
         g: 0,
         e: [],
         customData: {},
      },
      boxData: [],
   } as DeepRequiredIgnore<
      IEventBoxGroupContainer<ILightTranslationBoxContainer>,
      'customData'
   >,
   serialize(
      data: IWrapLightTranslationEventBoxGroupAttribute,
   ): IEventBoxGroupContainer<ILightTranslationBoxContainer> {
      return {
         object: {
            t: EventBoxType.TRANSLATION,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map(lightTranslationEventBox.serialize),
      };
   },
   deserialize(
      data: DeepPartial<
         IEventBoxGroupContainer<ILightTranslationBoxContainer>
      > = {},
   ): DeepPartial<IWrapLightTranslationEventBoxGroupAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         id: data.object?.g ?? this.defaultValue.object.g,
         boxes: (data.boxData ?? this.defaultValue.boxData).map(
            lightTranslationEventBox.deserialize,
         ),
         customData: deepCopy(
            data.object?.customData ?? this.defaultValue.object.customData,
         ),
      };
   },
   isValid(data: IWrapLightTranslationEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightTranslationEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions(
      data: IWrapLightTranslationEventBoxGroupAttribute,
   ): boolean {
      return false;
   },
   isMappingExtensions(
      data: IWrapLightTranslationEventBoxGroupAttribute,
   ): boolean {
      return false;
   },
};
