import type { IWrapLightTranslationEventBoxGroup } from './types/lightTranslationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBox } from './lightTranslationEventBox.ts';

export function createLightTranslationEventBoxGroup(
   data: DeepPartial<IWrapLightTranslationEventBoxGroup> = {},
): IWrapLightTranslationEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((e) => createLightTranslationEventBox(e)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
