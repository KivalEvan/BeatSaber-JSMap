import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IIndexFilter } from '../../../types/beatmap/v3/indexFilter.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v3/lightColorEvent.ts';
import type { ILightColorEventBox } from '../../../types/beatmap/v3/lightColorEventBox.ts';
import type { ILightColorEventBoxGroup } from '../../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import type { IWrapLightColorEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { lightColorEventBox } from './lightColorEventBox.ts';

export const lightColorEventBoxGroup: ISchemaContainer<
   IWrapLightColorEventBoxGroupAttribute,
   ILightColorEventBoxGroup
> = {
   defaultValue: {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   } as Required<ILightColorEventBoxGroup>,
   serialize(
      data: IWrapLightColorEventBoxGroupAttribute
   ): ILightColorEventBoxGroup {
      return {
         b: data.time,
         g: data.id,
         e: data.boxes.map(lightColorEventBox.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<ILightColorEventBoxGroup> = {}
   ): DeepPartial<IWrapLightColorEventBoxGroupAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         id: data.g ?? this.defaultValue.g,
         boxes: (data.e ?? this.defaultValue.e).map(
            lightColorEventBox.deserialize
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapLightColorEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma: function (data: IWrapLightColorEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions: function (
      data: IWrapLightColorEventBoxGroupAttribute
   ): boolean {
      return false;
   },
   isMappingExtensions: function (
      data: IWrapLightColorEventBoxGroupAttribute
   ): boolean {
      return false;
   },
};
