import type { IWrapBasicEvent } from './types/basicEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createBasicEvent(
   data: DeepPartial<IWrapBasicEvent> = {},
   options?: DeserializationOptions,
): IWrapBasicEvent {
   return {
      time: data.time ?? 0,
      type: data.type ?? 0,
      value: data.value ?? 0,
      floatValue: data.floatValue ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}
