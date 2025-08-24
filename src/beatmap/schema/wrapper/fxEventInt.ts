import type { IWrapFxEventInt } from './types/fxEventInt.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createFxEventInt(
   data: Partial<IWrapFxEventInt> = {},
): IWrapFxEventInt {
   return {
      time: data.time ?? 0,
      previous: data.previous ?? 0,
      value: data.value ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
