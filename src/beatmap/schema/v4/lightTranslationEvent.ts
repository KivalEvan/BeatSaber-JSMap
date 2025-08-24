import type { ILightTranslationEventContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightTranslationEvent } from '../wrapper/types/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEvent } from '../wrapper/lightTranslationEvent.ts';

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
