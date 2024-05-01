import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { IWrapLightRotationEventAttribute } from '../../../types/beatmap/wrapper/lightRotationEvent.ts';
import type { DeepPartial, DeepRequiredIgnore } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const lightRotationEvent: ISchemaContainer<
   IWrapLightRotationEventAttribute,
   ILightRotationEventContainer
> = {
   defaultValue: {
      data: {
         p: 0,
         e: 0,
         l: 0,
         r: 0,
         d: 0,
         customData: {},
      },
      time: 0,
   } as DeepRequiredIgnore<ILightRotationEventContainer, 'customData'>,
   serialize(
      data: IWrapLightRotationEventAttribute,
   ): ILightRotationEventContainer {
      return {
         data: {
            p: data.previous,
            l: data.loop,
            e: data.easing,
            r: data.rotation,
            d: data.direction,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(
      data: DeepPartial<ILightRotationEventContainer> = {},
   ): Partial<IWrapLightRotationEventAttribute> {
      return {
         time: data.time ?? this.defaultValue.time,
         previous: data.data?.p ?? this.defaultValue.data.p,
         easing: data.data?.e ?? this.defaultValue.data.e,
         loop: data.data?.l ?? this.defaultValue.data.l,
         rotation: data.data?.r ?? this.defaultValue.data.r,
         direction: data.data?.d ?? this.defaultValue.data.d,
         customData: deepCopy(
            data.data?.customData ?? this.defaultValue.data.customData,
         ),
      };
   },
   isValid(data: IWrapLightRotationEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapLightRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapLightRotationEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapLightRotationEventAttribute): boolean {
      return false;
   },
};
