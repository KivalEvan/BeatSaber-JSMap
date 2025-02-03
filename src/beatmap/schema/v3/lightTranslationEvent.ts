import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v3/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventAttribute } from '../../../types/beatmap/wrapper/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Light Translation Event`.
 */
export const lightTranslationEvent: ISchemaContainer<
   IWrapLightTranslationEventAttribute,
   ILightTranslationEvent
> = {
   serialize(data) {
      return {
         b: data.time,
         e: data.easing,
         p: data.previous,
         t: data.translation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         easing: data.e ?? 0,
         previous: data.p ?? 0,
         translation: data.t ?? 0,
         customData: data.customData ?? {},
      };
   },
};
