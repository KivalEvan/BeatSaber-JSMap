import type { IWrapLightRotationEventBox } from './types/lightRotationEventBox.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { copyCustomData } from './copyCustomData.ts';
import { createIndexFilter } from './indexFilter.ts';
import { createLightRotationEvent } from './lightRotationEvent.ts';

export function createLightRotationEventBox(
   data: DeepPartial<IWrapLightRotationEventBox> = {},
   options?: DeserializationOptions,
): IWrapLightRotationEventBox {
   return {
      filter: createIndexFilter(data.filter, options),
      axis: data.axis ?? 0,
      flip: data.flip ?? 0,
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      rotationDistribution: data.rotationDistribution ?? 0,
      rotationDistributionType: data.rotationDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((item) => createLightRotationEvent(item, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}
