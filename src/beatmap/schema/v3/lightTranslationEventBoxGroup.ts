import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightTranslationEventBoxGroup } from './types/lightTranslationEventBoxGroup.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../wrapper/types/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';

/**
 * Schema serialization for v3 `Light Translation Event Box Group`.
 */
export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroup,
   ILightTranslationEventBoxGroup
> = {
   serialize(data) {
      return {
         b: data.time,
         g: data.id,
         e: data.boxes.map((x) => {
            return lightTranslationEventBox.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createLightTranslationEventBoxGroup({
         time: data.b,
         id: data.g,
         boxes: data.e?.map((x) => {
            return lightTranslationEventBox.deserialize(x);
         }),
         customData: data.customData,
      });
   },
};
