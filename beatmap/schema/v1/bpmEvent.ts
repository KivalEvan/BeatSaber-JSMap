import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';

export const bpmEvent: ISchemaContainer<IWrapBPMEventAttribute, IEvent> = {
   defaultValue: {
      _time: 0,
      _type: 100,
      _value: 120,
   } as Required<IEvent>,
   serialize(data: IWrapBPMEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: 100,
         _value: Math.round(data.bpm),
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapBPMEventAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         bpm: data._value ?? this.defaultValue._value,
      };
   },
   isValid(_: IWrapBPMEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapBPMEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapBPMEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapBPMEventAttribute): boolean {
      return false;
   },
};
