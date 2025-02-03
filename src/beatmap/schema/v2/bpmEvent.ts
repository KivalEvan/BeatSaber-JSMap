import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `BPM Event`.
 */
export const bpmEvent: ISchemaContainer<IWrapBPMEventAttribute, IEvent> = {
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
      return {
         time: data._time ?? 0,
         bpm: data._floatValue ?? data._value ?? 0,
         customData: data._customData ?? {},
      };
   },
};
