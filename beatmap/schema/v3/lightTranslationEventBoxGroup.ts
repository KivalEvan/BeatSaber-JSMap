import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEventBoxGroup } from '../../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';

export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroupAttribute,
   ILightTranslationEventBoxGroup
> = {
   defaultValue: {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   } as Required<ILightTranslationEventBoxGroup>,
   serialize(
      data: IWrapLightTranslationEventBoxGroupAttribute,
   ): ILightTranslationEventBoxGroup {
      return {
         b: data.time,
         g: data.id,
         e: data.boxes.map(lightTranslationEventBox.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<ILightTranslationEventBoxGroup> = {},
   ): DeepPartial<IWrapLightTranslationEventBoxGroupAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         id: data.g ?? this.defaultValue.g,
         boxes: (data.e ?? this.defaultValue.e).map(
            lightTranslationEventBox.deserialize,
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(_: IWrapLightTranslationEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma: function (
      _: IWrapLightTranslationEventBoxGroupAttribute,
   ): boolean {
      return false;
   },
   isNoodleExtensions: function (
      _: IWrapLightTranslationEventBoxGroupAttribute,
   ): boolean {
      return false;
   },
   isMappingExtensions: function (
      _: IWrapLightTranslationEventBoxGroupAttribute,
   ): boolean {
      return false;
   },
};
