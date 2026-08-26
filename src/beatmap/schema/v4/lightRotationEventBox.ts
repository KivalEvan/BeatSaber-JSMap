import type { ILightRotationBoxContainer } from './types/container.ts';
import type { IWrapLightRotationEventBox } from '../wrapper/types/lightRotationEventBox.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';
import {
   deserializeLightRotationEvent,
   serializeLightRotationEvent,
} from './lightRotationEvent.ts';

/** Serialize beatmap v4 `Light Rotation Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightRotationEventBox(
   data: IWrapLightRotationEventBox,
): ILightRotationBoxContainer {
   return {
      data: {
         w: data.beatDistribution,
         d: data.beatDistributionType,
         s: data.rotationDistribution,
         t: data.rotationDistributionType,
         b: data.affectFirst,
         e: data.easing,
         a: data.axis,
         f: data.flip,
         customData: deepCopy(data.customData),
      },
      eventData: data.events.map((x) => {
         return serializeLightRotationEvent(x);
      }),
      filterData: serializeIndexFilter(data.filter),
   };
}

/** Deserialize schema object into beatmap v4 `Light Rotation Event Box` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightRotationEventBox(
   data: ILightRotationBoxContainer,
): IWrapLightRotationEventBox {
   return createLightRotationEventBox({
      filter: deserializeIndexFilter(data.filterData ?? {}),
      beatDistribution: data.data?.w,
      beatDistributionType: data.data?.d,
      rotationDistribution: data.data?.s,
      rotationDistributionType: data.data?.t,
      affectFirst: data.data?.b,
      easing: data.data?.e,
      axis: data.data?.a,
      flip: data.data?.f,
      events: data.eventData?.map((x) => {
         return deserializeLightRotationEvent(x);
      }),
      customData: data.data?.customData,
   });
}
