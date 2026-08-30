import type { IWrapLightTranslationEventBoxGroup } from './types/lightTranslationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createLightTranslationEventBox } from './lightTranslationEventBox.ts';

export function createLightTranslationEventBoxGroup(
   data: DeepPartial<IWrapLightTranslationEventBoxGroup> = {},
   options?: DeserializationOptions,
): IWrapLightTranslationEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((item) => createLightTranslationEventBox(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
