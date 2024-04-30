import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBPMEvent } from '../../../types/beatmap/v3/bpmEvent.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

export const bpmEvent: ISchemaContainer<IWrapBPMEventAttribute, IBPMEvent> = {
   defaultValue: {
      b: 0,
      m: 0,
      customData: {},
   } as Required<IBPMEvent>,
   serialize(data: IWrapBPMEventAttribute): IBPMEvent {
      return {
         b: data.time,
         m: data.bpm,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IBPMEvent> = {}): Partial<IWrapBPMEventAttribute> {
      return {
         time: data.b ?? this.defaultValue.b,
         bpm: data.m ?? this.defaultValue.m,
         customData: deepCopy(data.customData ?? this.defaultValue.customData),
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
