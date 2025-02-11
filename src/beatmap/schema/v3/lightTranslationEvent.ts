import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v3/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventAttribute } from '../../../types/beatmap/wrapper/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createLightTranslationEvent } from '../../core/lightTranslationEvent.ts';

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
      return createLightTranslationEvent({
         time: data.b,
         easing: data.e,
         previous: data.p,
         translation: data.t,
         customData: data.customData,
      });
   },
};
