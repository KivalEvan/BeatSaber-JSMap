import type { IWrapLightColorEvent } from './types/lightColorEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createLightColorEvent(
   data: DeepPartial<IWrapLightColorEvent> = {},
): IWrapLightColorEvent {
   return {
      time: data.time ?? 0,
      previous: data.previous ?? 0,
      color: data.color ?? 0,
      frequency: data.frequency ?? 0,
      brightness: data.brightness ?? 0,
      strobeBrightness: data.strobeBrightness ?? 0,
      strobeFade: data.strobeFade ?? 0,
      easing: data.easing ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
