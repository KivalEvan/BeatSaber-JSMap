import type { IWrapLightRotationEvent } from './types/lightRotationEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createLightRotationEvent(
   data: DeepPartial<IWrapLightRotationEvent> = {},
   options?: DeserializationOptions,
): IWrapLightRotationEvent {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      loop: data.loop ?? 0,
      direction: data.direction ?? 0,
      previous: data.previous ?? 0,
      rotation: data.rotation ?? 0,
      customData: copyCustomData(data.customData, options),
   };
}
