import type { IWrapFxEventFloat } from './types/fxEventFloat.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createFxEventFloat(
   data: DeepPartial<IWrapFxEventFloat> = {},
   options?: DeserializationOptions,
): IWrapFxEventFloat {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      previous: data.previous ?? 0,
      value: data.value ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}
