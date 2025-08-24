import type { IWrapNJSEvent } from './types/njsEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createNJSEvent(
   data: DeepPartial<IWrapNJSEvent> = {},
): IWrapNJSEvent {
   return {
      time: data.time ?? 0,
      value: data.value ?? 0,
      previous: data.previous ?? 0,
      easing: data.easing ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
