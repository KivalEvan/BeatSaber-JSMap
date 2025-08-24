import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IEvent } from './types/event.ts';
import type { IWrapBPMEvent } from '../../core/types/bpmEvent.ts';
import { createBPMEvent } from '../../core/bpmEvent.ts';

/**
 * Schema serialization for v1 `BPM Event`.
 */
export const bpmEvent: ISchemaContainer<IWrapBPMEvent, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 100,
         _value: Math.round(data.bpm),
      };
   },
   deserialize(data) {
      return createBPMEvent({
         time: data._time,
         bpm: data._value,
      });
   },
};
