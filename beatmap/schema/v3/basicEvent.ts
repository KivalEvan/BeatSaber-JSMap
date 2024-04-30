// deno-lint-ignore-file no-unused-vars
import type { IBasicEvent } from '../../../types/beatmap/v3/basicEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

export const basicEvent: ISchemaContainer<IWrapEventAttribute, IBasicEvent> = {
   defaultValue: {
      b: 0,
      et: 0,
      i: 0,
      f: 0,
      customData: {},
   } as Required<IBasicEvent>,
   serialize(data: IWrapEventAttribute): IBasicEvent {
      return {
         b: data.time,
         et: data.type,
         i: data.value,
         f: data.floatValue,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IBasicEvent> = {}): Partial<IWrapEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         type: data.et ?? this.defaultValue.et,
         value: data.i ?? this.defaultValue.i,
         floatValue: data.f ?? this.defaultValue.f,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
      };
   },
   isValid(data: IWrapEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapEventAttribute): boolean {
      if (data.isLightEvent()) {
         return (
            Array.isArray(data.customData.color) ||
            typeof data.customData.lightID === 'number' ||
            Array.isArray(data.customData.lightID) ||
            typeof data.customData.easing === 'string' ||
            typeof data.customData.lerpType === 'string'
         );
      }
      if (data.isRingEvent()) {
         return (
            typeof data.customData.nameFilter === 'string' ||
            typeof data.customData.rotation === 'number' ||
            typeof data.customData.step === 'number' ||
            typeof data.customData.prop === 'number' ||
            typeof data.customData.speed === 'number' ||
            typeof data.customData.direction === 'number'
         );
      }
      if (data.isLaserRotationEvent()) {
         return (
            typeof data.customData.lockRotation === 'boolean' ||
            typeof data.customData.speed === 'number' ||
            typeof data.customData.direction === 'number'
         );
      }
      return false;
   },
   isNoodleExtensions(data: IWrapEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapEventAttribute): boolean {
      return false;
   },
};
