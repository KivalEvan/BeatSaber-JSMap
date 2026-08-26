import type { IColorBoostEvent } from './types/colorBoostEvent.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/** Serialize beatmap v3 `Color Boost Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeColorBoostEvent(data: IWrapColorBoostEvent): IColorBoostEvent {
   return {
      b: data.time,
      o: data.toggle,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Color Boost Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeColorBoostEvent(
   data: IColorBoostEvent = {} as IColorBoostEvent,
): IWrapColorBoostEvent {
   return createColorBoostEvent({
      time: data.b,
      toggle: !!data.o,
      customData: data.customData,
   });
}
