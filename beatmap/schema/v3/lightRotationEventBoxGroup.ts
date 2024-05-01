import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEventBoxGroup } from '../../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { lightRotationEventBox } from './lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapLightRotationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';

export const lightRotationEventBoxGroup: ISchemaContainer<
   IWrapLightRotationEventBoxGroupAttribute,
   ILightRotationEventBoxGroup
> = {
   defaultValue: {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   } as Required<ILightRotationEventBoxGroup>,
   serialize(
      data: IWrapLightRotationEventBoxGroupAttribute,
   ): ILightRotationEventBoxGroup {
      return {
         b: data.time,
         g: data.id,
         e: data.boxes.map(lightRotationEventBox.serialize),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: DeepPartial<ILightRotationEventBoxGroup> = {},
   ): DeepPartial<IWrapLightRotationEventBoxGroupAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         id: data.g ?? this.defaultValue.g,
         boxes: (data.e ?? this.defaultValue.e).map(
            lightRotationEventBox.deserialize,
         ),
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapLightRotationEventBoxGroupAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightRotationEventBoxGroupAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightRotationEventBoxGroupAttribute): boolean {
      return false;
   },
   isMappingExtensions(
      data: IWrapLightRotationEventBoxGroupAttribute,
   ): boolean {
      return false;
   },
};
