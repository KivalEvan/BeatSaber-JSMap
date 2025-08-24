import type { IWrapBasicEvent } from './types/basicEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createBasicEvent(
   data: DeepPartial<IWrapBasicEvent> = {},
): IWrapBasicEvent {
   return {
      time: data.time ?? 0,
      type: data.type ?? 0,
      value: data.value ?? 0,
      floatValue: data.floatValue ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
