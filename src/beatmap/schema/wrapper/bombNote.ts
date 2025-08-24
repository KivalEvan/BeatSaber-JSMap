import type { IWrapBombNote } from './types/bombNote.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';

export function createBombNote(
   data: DeepPartial<IWrapBombNote> = {},
): IWrapBombNote {
   return {
      time: data.time ?? 0,
      posX: data.posX ?? 0,
      posY: data.posY ?? 0,
      color: -1,
      direction: data.direction ?? 0,
      laneRotation: data.laneRotation ?? 0,
      customData: deepCopy({ ...data.customData }),
   };
}
