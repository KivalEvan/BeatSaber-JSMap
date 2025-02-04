import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBPMEvent } from '../../../types/beatmap/v3/bpmEvent.ts';
import type { IWrapBPMEventAttribute } from '../../../types/beatmap/wrapper/bpmEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `BPM Event`.
 */
export const bpmEvent: ISchemaContainer<IWrapBPMEventAttribute, IBPMEvent> = {
   serialize(data) {
      return {
         b: data.time,
         m: data.bpm,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         bpm: data.m ?? 0,
         customData: data.customData ?? {},
      };
   },
};
