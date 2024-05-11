import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ISpawnRotationContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   ISpawnRotationContainer
> = {
   defaultValue: {
      object: { b: 0, i: 0, customData: {} },
      data: { e: 0, r: 0, customData: {} },
   } as DeepRequiredIgnore<ISpawnRotationContainer, 'customData'>,
   serialize(data: IWrapRotationEventAttribute): ISpawnRotationContainer {
      return {
         object: { b: data.time },
         data: {
            e: data.executionTime,
            r: data.rotation,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(
      data: DeepPartial<ISpawnRotationContainer> = {},
   ): Partial<IWrapRotationEventAttribute> {
      return {
         time: data.object?.b ?? this.defaultValue.object.b,
         executionTime: data.data?.e ?? this.defaultValue.data.e,
         rotation: data.data?.r ?? this.defaultValue.data.r,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData,
         ),
      };
   },
   isValid(_: IWrapRotationEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
};
