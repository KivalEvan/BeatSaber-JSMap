// deno-lint-ignore-file no-unused-vars
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapColorBoostEventAttribute } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';

export const colorBoostEvent: ISchemaContainer<IWrapColorBoostEventAttribute, IEvent> = {
   defaultValue: {
      _time: 0,
      _type: 5,
      _value: 0,
      _floatValue: 0,
      _customData: {},
   } as Required<IEvent>,
   serialize(data: IWrapColorBoostEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: 5,
         _value: data.toggle ? 1 : 0,
         _floatValue: 0,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapColorBoostEventAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         toggle: (data._value ?? this.defaultValue._value) === 1,
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
         ),
      };
   },
   isValid(data: IWrapColorBoostEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapColorBoostEventAttribute): boolean {
      return false;
   },
};
