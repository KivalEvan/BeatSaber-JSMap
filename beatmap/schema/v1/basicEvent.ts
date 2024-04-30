import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapEventAttribute } from '../../../types/beatmap/wrapper/event.ts';

export const basicEvent: ISchemaContainer<IWrapEventAttribute, IEvent> = {
   defaultValue: {
      _time: 0,
      _type: 0,
      _value: 0,
   } as Required<IEvent>,
   serialize(data: IWrapEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: data.type,
         _value: data.value,
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapEventAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         type: data._type ?? this.defaultValue._type,
         value: data._value ?? this.defaultValue._value,
         floatValue: 1,
      };
   },
   isValid(_: IWrapEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapEventAttribute): boolean {
      return false;
   },
};
