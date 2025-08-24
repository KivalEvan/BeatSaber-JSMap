import type { IWrapLightRotationEvent } from './types/lightRotationEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createLightRotationEvent(
   data: DeepPartial<IWrapLightRotationEvent> = {},
): IWrapLightRotationEvent {
   return {
      time: data.time ?? 0,
      easing: data.easing ?? 0,
      loop: data.loop ?? 0,
      direction: data.direction ?? 0,
      previous: data.previous ?? 0,
      rotation: data.rotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
