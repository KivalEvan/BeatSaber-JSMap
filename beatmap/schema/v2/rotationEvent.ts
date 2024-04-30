// deno-lint-ignore-file no-unused-vars
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';

export const rotationEvent: ISchemaContainer<IWrapRotationEventAttribute, IEvent> = {
   defaultValue: {
      _time: 0,
      _type: 14,
      _value: 0,
      _floatValue: 0,
      _customData: {},
   } as Required<IEvent>,
   // FIXME: Rotation event rotation value fix
   serialize(data: IWrapRotationEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: data.executionTime === 1 ? 15 : 14,
         _value: data.rotation,
         _floatValue: 0,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapRotationEventAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         executionTime: (data._type ?? this.defaultValue._type) === 15 ? 1 : 0,
         rotation: data._value ?? this.defaultValue._value,
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
         ),
      };
   },
   isValid(data: IWrapRotationEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapRotationEventAttribute): boolean {
      return (
         typeof data.customData._rotation === 'number'
      );
   },
   isMappingExtensions(data: IWrapRotationEventAttribute): boolean {
      return (
         data.rotation >= 1000 && data.rotation <= 1720
      );
   },
};
