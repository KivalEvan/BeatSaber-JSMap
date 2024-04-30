import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IRotationEvent } from '../../../types/beatmap/v3/rotationEvent.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   IRotationEvent
> = {
   defaultValue: {
      b: 0,
      e: 0,
      r: 0,
      customData: {},
   } as Required<IRotationEvent>,
   serialize(data: IWrapRotationEventAttribute): IRotationEvent {
      return {
         b: data.time,
         e: data.executionTime,
         r: data.rotation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<IRotationEvent> = {}
   ): Partial<IWrapRotationEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         executionTime: data.e ?? this.defaultValue.e,
         rotation: data.r ?? this.defaultValue.r,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapRotationEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapRotationEventAttribute): boolean {
      return false;
   },
};
