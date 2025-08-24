import type { IWrapColorBoostEvent } from './types/colorBoostEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createColorBoostEvent(
   data: DeepPartial<IWrapColorBoostEvent> = {},
): IWrapColorBoostEvent {
   return {
      time: data.time ?? 0,
      toggle: data.toggle ?? false,
      customData: deepCopy({ ...data.customData }),
   };
}
