import type { ILightTranslationEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightTranslationEvent } from '../../../types/beatmap/wrapper/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEvent } from '../../core/lightTranslationEvent.ts';

/**
 * Schema serialization for v4 `Light Translation Event`.
 */
export const lightTranslationEvent: ISchemaContainer<
   IWrapLightTranslationEvent,
   ILightTranslationEventContainer
> = {
   serialize(data) {
      return {
         data: {
            p: data.previous,
            e: data.easing,
            t: data.translation,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(data) {
      return createLightTranslationEvent({
         time: data.time,
         previous: data.data?.p,
         easing: data.data?.e,
         translation: data.data?.t,
         customData: data.data?.customData,
      });
   },
};
