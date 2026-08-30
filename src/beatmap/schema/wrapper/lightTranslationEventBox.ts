import type { IWrapLightTranslationEventBox } from './types/lightTranslationEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createIndexFilter } from './indexFilter.ts';
import { createLightTranslationEvent } from './lightTranslationEvent.ts';

export function createLightTranslationEventBox(
   data: DeepPartial<IWrapLightTranslationEventBox> = {},
   options?: DeserializationOptions,
): IWrapLightTranslationEventBox {
   return {
      filter: createIndexFilter(data.filter, options),
      axis: data.axis ?? 0,
      flip: data.flip ?? 0,
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      gapDistribution: data.gapDistribution ?? 0,
      gapDistributionType: data.gapDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((item) => createLightTranslationEvent(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
