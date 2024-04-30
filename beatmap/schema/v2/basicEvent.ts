// deno-lint-ignore-file no-unused-vars
import { deepCopy } from '../../../utils/misc.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';

export const basicEvent: ISchemaContainer<IWrapEventAttribute, IEvent> = {
   defaultValue: {
      _time: 0,
      _type: 0,
      _value: 0,
      _floatValue: 0,
      _customData: {},
   } as Required<IEvent>,
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
         time: data._time ?? this.defaultValue._time,
         type: data._type ?? this.defaultValue._type,
         value: data._value ?? this.defaultValue._value,
         floatValue: data._floatValue ?? this.defaultValue._floatValue,
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
         ),
      };
   },
   isValid(data: IWrapEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapEventAttribute): boolean {
      if (ev.isLightEvent()) {
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
      if (ev.isRingEvent()) {
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
      if (ev.isLaserRotationEvent()) {
         return (
            typeof data.customData._lockPosition === 'boolean' ||
            typeof data.customData._speed === 'number' ||
            typeof data.customData._preciseSpeed === 'number' ||
            typeof data.customData._direction === 'number'
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
