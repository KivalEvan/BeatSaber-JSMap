import type { IBasicEvent } from '../../../types/beatmap/v3/basicEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

const defaultValue = {
   b: 0,
   et: 0,
   i: 0,
   f: 0,
   customData: {},
} as Required<IBasicEvent>;
export const basicEvent: ISchemaContainer<IWrapEventAttribute, IBasicEvent> = {
   defaultValue,
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
         time: data.b ?? defaultValue.b,
         type: data.et ?? defaultValue.et,
         value: data.i ?? defaultValue.i,
         floatValue: data.f ?? defaultValue.f,
         customData: deepCopy(data.customData ?? defaultValue.customData),
      };
   },
   isChroma(_: IWrapEventAttribute): boolean {
      // FIXME: chroma
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
};
