import type { IWrapBPMEvent } from './types/bpmEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createBPMEvent(
   data: DeepPartial<IWrapBPMEvent> = {},
   options?: DeserializationOptions,
): IWrapBPMEvent {
   return {
      time: data.time ?? 0,
      bpm: data.bpm ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}
