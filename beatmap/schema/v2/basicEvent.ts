import { deepCopy } from '../../../utils/misc.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

const defaultValue = {
   _time: 0,
   _type: 0,
   _value: 0,
   _floatValue: 0,
   _customData: {},
} as Required<IEvent>;
export const basicEvent: ISchemaContainer<IWrapEventAttribute, IEvent> = {
   defaultValue,
   serialize(data: IWrapEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: data.type,
         _value: data.value,
         _floatValue: data.floatValue,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapEventAttribute> {
      return {
         time: data._time ?? defaultValue._time,
         type: data._type ?? defaultValue._type,
         value: data._value ?? defaultValue._value,
         floatValue: data._floatValue ?? defaultValue._floatValue,
         customData: deepCopy(
            data._customData ?? defaultValue._customData,
         ),
      };
   },
   isChroma(data: IWrapEventAttribute): boolean {
      // FIXME: well now i have to properly check
      if (data.isLightEvent()) {
         return (
            Array.isArray(data.customData._color) ||
            typeof data.customData._lightID === 'number' ||
            Array.isArray(data.customData._lightID) ||
            typeof data.customData._propID === 'number' ||
            typeof data.customData._lightGradient === 'object' ||
            typeof data.customData._easing === 'string' ||
            typeof data.customData._lerpType === 'string'
         );
      }
      if (data.isRingEvent()) {
         return (
            typeof data.customData._nameFilter === 'string' ||
            typeof data.customData._reset === 'boolean' ||
            typeof data.customData._rotation === 'number' ||
            typeof data.customData._step === 'number' ||
            typeof data.customData._prop === 'number' ||
            typeof data.customData._speed === 'number' ||
            typeof data.customData._direction === 'number' ||
            typeof data.customData._counterSpin === 'boolean' ||
            typeof data.customData._stepMult === 'number' ||
            typeof data.customData._propMult === 'number' ||
            typeof data.customData._speedMult === 'number'
         );
      }
      if (data.isLaserRotationEvent()) {
         return (
            typeof data.customData._lockPosition === 'boolean' ||
            typeof data.customData._speed === 'number' ||
            typeof data.customData._preciseSpeed === 'number' ||
            typeof data.customData._direction === 'number'
         );
      }
      return false;
   },
};
