import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightTranslationEvent } from './types/lightTranslationEvent.ts';
import type { IWrapLightTranslationEvent } from '../wrapper/types/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEvent } from '../wrapper/lightTranslationEvent.ts';

/**
 * Schema serialization for v3 `Light Translation Event`.
 */
export const lightTranslationEvent: ISchemaContainer<
   IWrapLightTranslationEvent,
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
