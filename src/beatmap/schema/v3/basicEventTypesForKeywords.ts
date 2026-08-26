import type { IBasicEventTypesForKeywords } from './types/basicEventTypesForKeywords.ts';
import type { IWrapBasicEventTypesForKeywords } from '../wrapper/types/basicEventTypesForKeywords.ts';
import { createBasicEventTypesForKeywords } from '../wrapper/basicEventTypesForKeywords.ts';

/** Serialize beatmap v3 `Basic Event Types For Keywords` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEventTypesForKeywords(
   data: IWrapBasicEventTypesForKeywords,
): IBasicEventTypesForKeywords {
   return {
      k: data.keyword,
      e: data.events.map((e) => e),
   };
}

/** Deserialize schema object into beatmap v3 `Basic Event Types For Keywords` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEventTypesForKeywords(
   data: IBasicEventTypesForKeywords,
): IWrapBasicEventTypesForKeywords {
   return createBasicEventTypesForKeywords({
      keyword: data.k,
      events: data.e?.map((e) => e),
   });
}
