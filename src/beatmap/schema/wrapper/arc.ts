import type { IWrapArc } from './types/arc.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';

export function createArc(
   data: DeepPartial<IWrapArc> = {},
   options?: DeserializationOptions,
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
      customData: copyCustomData(data.customData, options),
   };
}
