import type { IBasicEventContainer } from './types/container.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../wrapper/basicEvent.ts';

/** Serialize beatmap v4 `Basic Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEvent(data: IWrapBasicEvent): IBasicEventContainer {
   return {
      object: {
         b: data.time,
         i: 0,
         customData: {},
      },
      data: {
         t: data.type,
         i: data.value,
         f: data.floatValue,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `Basic Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEvent(data: IBasicEventContainer): IWrapBasicEvent {
   return createBasicEvent({
      time: data.object?.b,
      type: data.data?.t,
      value: data.data?.i,
      floatValue: data.data?.f,
      customData: data.data?.customData,
   });
}
