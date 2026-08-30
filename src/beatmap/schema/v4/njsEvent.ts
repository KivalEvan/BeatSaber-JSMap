import type { INjsEventContainer } from './types/container.ts';
import type { IWrapNJSEvent } from '../wrapper/types/njsEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createNJSEvent } from '../wrapper/njsEvent.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';

/** Serialize beatmap v4 `NJSEvent` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeNJSEvent(data: IWrapNJSEvent): INjsEventContainer {
   return {
      object: {
         b: data.time,
         i: 0,
         customData: {},
      },
      data: {
         d: data.value,
         p: data.previous,
         e: data.easing,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `NJSEvent` object.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeNJSEvent(
   data: INjsEventContainer,
   options?: DeserializationOptions,
): IWrapNJSEvent {
   return createNJSEvent({
      time: data.object?.b,
      value: data.data?.d,
      previous: data.data?.p,
      easing: data.data?.e,
      customData: data.data?.customData,
   }, options);
}
