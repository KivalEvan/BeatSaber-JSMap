import type { IWrapBPMEvent } from './types/bpmEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createBPMEvent(
   data: DeepPartial<IWrapBPMEvent> = {},
): IWrapBPMEvent {
   return {
      time: data.time ?? 0,
      bpm: data.bpm ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
