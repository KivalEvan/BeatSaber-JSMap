import type { IWrapRotationEvent } from './types/rotationEvent.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createRotationEvent(
   data: DeepPartial<IWrapRotationEvent> = {},
): IWrapRotationEvent {
   return {
      time: data.time ?? 0,
      executionTime: data.executionTime ?? 0,
      rotation: data.rotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
