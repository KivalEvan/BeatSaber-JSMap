import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';

export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   IEvent
> = {
   defaultValue: {
      _time: 0,
      _type: 14,
      _value: 0,
   } as Required<IEvent>,
   // FIXME: fix rotation conversion
   serialize(data: IWrapRotationEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: data.executionTime === 1 ? 15 : 14,
         _value: data.rotation,
      };
   },
   deserialize(
      data: Partial<IEvent> = {},
   ): Partial<IWrapRotationEventAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         executionTime: (data._type ?? this.defaultValue._type) === 15 ? 1 : 0,
         rotation: data._value ?? this.defaultValue._value,
      };
   },
   isValid(_: IWrapRotationEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
};
