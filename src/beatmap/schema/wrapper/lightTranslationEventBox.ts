import type { IWrapLightTranslationEventBox } from './types/lightTranslationEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createIndexFilter } from './indexFilter.ts';
import { createLightTranslationEvent } from './lightTranslationEvent.ts';

export function createLightTranslationEventBox(
   data: DeepPartial<IWrapLightTranslationEventBox> = {},
): IWrapLightTranslationEventBox {
   return {
      filter: createIndexFilter(data.filter),
      axis: data.axis ?? 0,
      flip: data.flip ?? 0,
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      gapDistribution: data.gapDistribution ?? 0,
      gapDistributionType: data.gapDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((o) => createLightTranslationEvent(o)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
