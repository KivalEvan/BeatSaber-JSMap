import type { IWrapArc } from './types/arc.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createArc(
   data: DeepPartial<IWrapArc> = {},
): IWrapArc {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: data.color ?? 0,
      direction: data.direction ?? 0,
      lengthMultiplier: data.lengthMultiplier ?? 0,
      tailTime: data.tailTime ?? 0,
      tailPosX: data.tailPosX ?? 0,
      tailPosY: data.tailPosY ?? 0,
      tailDirection: data.tailDirection ?? 0,
      tailLengthMultiplier: data.tailLengthMultiplier ?? 0,
      midAnchor: data.midAnchor ?? 0,
      laneRotation: data.laneRotation ?? 0,
      tailLaneRotation: data.tailLaneRotation ?? 0,
      customData: deepCopy(data.customData ?? {}),
   };
}
