import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';

/**
 * Schema serialization for v1 `BPM Event`.
 */
export const bpmEvent: ISchemaContainer<IWrapBPMEventAttribute, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 100,
         _value: Math.round(data.bpm),
      };
   },
   deserialize(data) {
      return {
         time: data._time ?? 0,
         bpm: data._value ?? 0,
         customData: {},
      };
   },
};
