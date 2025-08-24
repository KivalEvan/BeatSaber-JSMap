import type { IWrapLightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBox } from './lightColorEventBox.ts';

export function createLightColorEventBoxGroup(
   data: DeepPartial<IWrapLightColorEventBoxGroup> = {},
): IWrapLightColorEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((e) => createLightColorEventBox(e)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
