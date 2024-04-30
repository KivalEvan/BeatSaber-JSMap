// deno-lint-ignore-file no-unused-vars
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';

export const bpmEvent: ISchemaContainer<IWrapBPMEventAttribute, IEvent> = {
   defaultValue: {
      _time: 0,
      _type: 100,
      _value: 0,
      _floatValue: 120,
      _customData: {},
   } as Required<IEvent>,
   serialize(data: IWrapBPMEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: 100,
         _value: 0,
         _floatValue: data.bpm,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapBPMEventAttribute> {
      return {
         time: data._time ?? this.defaultValue._time,
         bpm: data._floatValue ?? (data._value || this.defaultValue._floatValue),
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
         ),
      };
   },
   isValid(data: IWrapBPMEventAttribute): boolean {
      return true;
   },
   isChroma(data: IWrapBPMEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapBPMEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(data: IWrapBPMEventAttribute): boolean {
      return false;
   },
};
