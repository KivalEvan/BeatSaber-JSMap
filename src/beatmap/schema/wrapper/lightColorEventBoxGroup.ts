import type { IWrapLightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createLightColorEventBox } from './lightColorEventBox.ts';

export function createLightColorEventBoxGroup(
   data: DeepPartial<IWrapLightColorEventBoxGroup> = {},
   options?: DeserializationOptions,
): IWrapLightColorEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((item) => createLightColorEventBox(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
