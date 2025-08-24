import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IBPMEvent } from './types/bpmEvent.ts';
import type { IWrapBPMEvent } from '../wrapper/types/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBPMEvent } from '../wrapper/bpmEvent.ts';

/**
 * Schema serialization for v3 `BPM Event`.
 */
export const bpmEvent: ISchemaContainer<IWrapBPMEvent, IBPMEvent> = {
   serialize(data) {
      return {
         b: data.time,
         m: data.bpm,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createBPMEvent({
         time: data.b,
         bpm: data.m,
         customData: data.customData,
      });
   },
};
