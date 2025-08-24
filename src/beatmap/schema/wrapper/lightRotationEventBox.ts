import type { IWrapLightRotationEventBox } from './types/lightRotationEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createIndexFilter } from './indexFilter.ts';
import { createLightRotationEvent } from './lightRotationEvent.ts';

export function createLightRotationEventBox(
   data: DeepPartial<IWrapLightRotationEventBox> = {},
): IWrapLightRotationEventBox {
   return {
      filter: createIndexFilter(data.filter),
      axis: data.axis ?? 0,
      flip: data.flip ?? 0,
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      rotationDistribution: data.rotationDistribution ?? 0,
      rotationDistributionType: data.rotationDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((o) => createLightRotationEvent(o)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}
