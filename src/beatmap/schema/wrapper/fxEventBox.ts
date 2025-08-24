import type { IWrapFxEventBox } from './types/fxEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventFloat } from './fxEventFloat.ts';
import { createIndexFilter } from './indexFilter.ts';

export function createFxEventBox(
   data: DeepPartial<IWrapFxEventBox> = {},
): IWrapFxEventBox {
   return {
      filter: createIndexFilter(data.filter),
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      fxDistribution: data.fxDistribution ?? 0,
      fxDistributionType: data.fxDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map(createFxEventFloat) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
