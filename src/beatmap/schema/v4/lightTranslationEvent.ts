import type { ILightTranslationEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightTranslationEventAttribute } from '../../../types/beatmap/wrapper/lightTranslationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Light Translation Event`.
 */
export const lightTranslationEvent: ISchemaContainer<
   IWrapLightTranslationEventAttribute,
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
      return {
         time: data.time ?? 0,
         previous: data.data?.p ?? 0,
         easing: data.data?.e ?? 0,
         translation: data.data?.t ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
