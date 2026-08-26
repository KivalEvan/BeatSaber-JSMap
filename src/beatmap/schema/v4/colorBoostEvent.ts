import type { IColorBoostEventContainer } from './types/container.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/** Serialize beatmap v4 `Color Boost Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorBoostEvent(data: IWrapColorBoostEvent): IColorBoostEventContainer {
   return {
      object: {
         b: data.time,
         i: 0,
         customData: {},
      },
      data: {
         b: data.toggle ? 1 : 0,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `Color Boost Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorBoostEvent(data: IColorBoostEventContainer): IWrapColorBoostEvent {
   return createColorBoostEvent({
      time: data.object?.b,
      toggle: !!data.data?.b,
      customData: data.data?.customData,
   });
}
