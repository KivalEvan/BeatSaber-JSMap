import type { IEventBoxGroupContainer, ILightTranslationBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../../core/types/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightTranslationEventBoxGroup } from '../../core/lightTranslationEventBoxGroup.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';

/**
 * Schema serialization for v4 `Light Translation Event Box Group`.
 */
export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroup,
   IEventBoxGroupContainer<ILightTranslationBoxContainer>
> = {
   serialize(data) {
      return {
         object: {
            t: EventBoxType.TRANSLATION,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map((x) => {
            return lightTranslationEventBox.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return createLightTranslationEventBoxGroup({
         time: data.object?.b,
         id: data.object?.g,
         boxes: data.boxData?.map((x) => {
            return lightTranslationEventBox.deserialize(x);
         }),
         customData: data.object?.customData,
      });
   },
};
