import type { IWrapObstacle } from './types/obstacle.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createObstacle(
   data: DeepPartial<IWrapObstacle> = {},
): IWrapObstacle {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      width: data.width ?? 0,
      height: data.height ?? 0,
      duration: data.duration ?? 0,
      laneRotation: data.laneRotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
