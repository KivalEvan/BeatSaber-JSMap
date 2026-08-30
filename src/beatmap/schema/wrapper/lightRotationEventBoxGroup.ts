import type { IWrapLightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createLightRotationEventBox } from './lightRotationEventBox.ts';

export function createLightRotationEventBoxGroup(
   data: DeepPartial<IWrapLightRotationEventBoxGroup> = {},
   options?: DeserializationOptions,
): IWrapLightRotationEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((item) => createLightRotationEventBox(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
