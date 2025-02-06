import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapBPMEvent } from '../../../types/beatmap/wrapper/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createBPMEvent } from '../../core/bpmEvent.ts';

/**
 * Schema serialization for v2 `BPM Event`.
 */
export const bpmEvent: ISchemaContainer<IWrapBPMEvent, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 100,
         _value: 0,
         _floatValue: data.bpm,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createBPMEvent({
         time: data._time,
         bpm: data._floatValue ?? data._value,
         customData: data._customData,
      });
   },
};
