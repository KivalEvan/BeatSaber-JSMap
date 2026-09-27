import type { IWrapColorBoostEvent } from './types/colorBoostEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { IDeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createColorBoostEvent(
   data: DeepPartial<IWrapColorBoostEvent> = {},
   options?: IDeserializationOptions,
): IWrapColorBoostEvent {
   return {
      time: data.time ?? 0,
      toggle: data.toggle ?? false,
      customData: copyCustomData(data.customData, options),
   };
}
