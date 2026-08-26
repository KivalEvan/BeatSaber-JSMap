import type { IBasicEventTypesWithKeywords } from './types/basicEventTypesWithKeywords.ts';
import type { IWrapBasicEventTypesWithKeywords as IWrapBasicEventTypesWithKeywords } from '../wrapper/types/basicEventTypesWithKeywords.ts';
import {
   deserializeBasicEventTypesForKeywords,
   serializeBasicEventTypesForKeywords,
} from './basicEventTypesForKeywords.ts';

/** Serialize beatmap v3 `Basic Event Types With Keywords` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeBasicEventTypesWithKeywords(
   data: IWrapBasicEventTypesWithKeywords,
): IBasicEventTypesWithKeywords {
   return {
      d: data.list.map((x) => {
         return serializeBasicEventTypesForKeywords(x);
      }),
   };
}

/** Deserialize schema object into beatmap v3 `Basic Event Types With Keywords` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeBasicEventTypesWithKeywords(
   data: IBasicEventTypesWithKeywords,
): IWrapBasicEventTypesWithKeywords {
   return {
      list: data.d?.map((x) => {
         return deserializeBasicEventTypesForKeywords(x);
      }) ?? [],
   };
}
