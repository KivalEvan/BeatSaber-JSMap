import type { ILightRotationEventBox } from './types/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBox } from '../wrapper/types/lightRotationEventBox.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBox } from '../wrapper/lightRotationEventBox.ts';
import { deserializeIndexFilter, serializeIndexFilter } from './indexFilter.ts';
import {
   deserializeLightRotationEvent,
   serializeLightRotationEvent,
} from './lightRotationEvent.ts';

/** Serialize beatmap v3 `Light Rotation Event Box` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightRotationEventBox(
   data: IWrapLightRotationEventBox,
): ILightRotationEventBox {
   return {
      f: serializeIndexFilter(data.filter),
      w: data.beatDistribution,
      d: data.beatDistributionType,
      s: data.rotationDistribution,
      t: data.rotationDistributionType,
      a: data.axis,
      r: data.flip,
      b: data.affectFirst,
      i: data.easing,
      l: data.events.map((x) => {
         return serializeLightRotationEvent(x);
      }),
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Rotation Event Box` object.
 * @param data The serialized schema object.
 * @param options Deserialization options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightRotationEventBox(
   data: ILightRotationEventBox,
   options?: DeserializationOptions,
): IWrapLightRotationEventBox {
   return createLightRotationEventBox({
      filter: deserializeIndexFilter(data.f ?? {}, options),
      beatDistribution: data.w,
      beatDistributionType: data.d,
      rotationDistribution: data.s,
      rotationDistributionType: data.t,
      axis: data.a,
      flip: data.r,
      affectFirst: data.b,
      easing: data.i,
      events: data.l?.map((x) => {
         return deserializeLightRotationEvent(x, options);
      }),
      customData: data.customData,
   }, options);
}
