import type { IWrapFxEventBoxGroup } from './types/fxEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBox } from './fxEventBox.ts';

export function createFxEventBoxGroup(
   data: DeepPartial<IWrapFxEventBoxGroup> = {},
): IWrapFxEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map(createFxEventBox) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
