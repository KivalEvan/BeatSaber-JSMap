import type { IWrapLightColorEventBox } from './types/lightColorEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createIndexFilter } from './indexFilter.ts';
import { createLightColorEvent } from './lightColorEvent.ts';

export function createLightColorEventBox(
   data: DeepPartial<IWrapLightColorEventBox> = {},
): IWrapLightColorEventBox {
   return {
      filter: createIndexFilter(data.filter),
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      brightnessDistribution: data.brightnessDistribution ?? 0,
      brightnessDistributionType: data.brightnessDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((o) => createLightColorEvent(o)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
