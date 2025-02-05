import type {
   IEventBoxGroupContainer,
   ILightTranslationBoxContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createLightTranslationEventBoxGroup } from '../../core/lightTranslationEventBoxGroup.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';

/**
 * Schema serialization for v4 `Light Translation Event Box Group`.
 */
export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroupAttribute,
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
