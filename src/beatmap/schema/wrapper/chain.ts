import type { IWrapChain } from './types/chain.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createChain(
   data: DeepPartial<IWrapChain> = {},
): IWrapChain {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: data.color ?? 0,
      direction: data.direction ?? 0,
      laneRotation: data.laneRotation ?? 0,
      tailTime: data.tailTime ?? 0,
      tailPosX: data.tailPosX ?? 0,
      tailPosY: data.tailPosY ?? 0,
      tailLaneRotation: data.tailLaneRotation ?? 0,
      sliceCount: data.sliceCount ?? 0,
      squish: data.squish ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
