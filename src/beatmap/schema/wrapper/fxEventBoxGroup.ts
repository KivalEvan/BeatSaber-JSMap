import type { IWrapFxEventBoxGroup } from './types/fxEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createFxEventBox } from './fxEventBox.ts';

export function createFxEventBoxGroup(
   data: DeepPartial<IWrapFxEventBoxGroup> = {},
   options?: DeserializationOptions,
): IWrapFxEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((item) => createFxEventBox(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
