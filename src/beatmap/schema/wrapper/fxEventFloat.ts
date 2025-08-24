import type { IWrapFxEventFloat } from './types/fxEventFloat.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createFxEventFloat(
   data: DeepPartial<IWrapFxEventFloat> = {},
): IWrapFxEventFloat {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      previous: data.previous ?? 0,
      value: data.value ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
