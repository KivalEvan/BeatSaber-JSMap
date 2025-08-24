import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBPMEvent } from '../wrapper/bpmEvent.ts';

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
