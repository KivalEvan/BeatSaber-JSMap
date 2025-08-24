import type { IWrapLightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBox } from './lightRotationEventBox.ts';

export function createLightRotationEventBoxGroup(
   data: DeepPartial<IWrapLightRotationEventBoxGroup> = {},
): IWrapLightRotationEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((e) => createLightRotationEventBox(e)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
