import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v3/lightRotationEvent.ts';
import type { IWrapLightRotationEventAttribute } from '../../../types/beatmap/wrapper/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const lightRotationEvent: ISchemaContainer<
   IWrapLightRotationEventAttribute,
   ILightRotationEvent
> = {
   defaultValue: {
      b: 0,
      p: 0,
      e: 0,
      l: 0,
      r: 0,
      o: 0,
      customData: {},
   } as Required<ILightRotationEvent>,
   serialize(data: IWrapLightRotationEventAttribute): ILightRotationEvent {
      return {
         b: data.time,
         e: data.easing,
         l: data.loop,
         o: data.direction,
         p: data.previous,
         r: data.rotation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<ILightRotationEvent> = {},
   ): Partial<IWrapLightRotationEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         easing: data.e ?? this.defaultValue.e,
         loop: data.l ?? this.defaultValue.l,
         direction: data.o ?? this.defaultValue.o,
         previous: data.p ?? this.defaultValue.p,
         rotation: data.r ?? this.defaultValue.r,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
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
