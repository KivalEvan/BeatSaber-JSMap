import type { IWrapFxEventInt } from './types/fxEventInt.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createFxEventInt(
   data: Partial<IWrapFxEventInt> = {},
): IWrapFxEventInt {
   return {
      time: data.time ?? 0,
      previous: data.previous ?? 0,
      value: data.value ?? 0,
      customData: copyCustomData(data.customData),
   };
}
