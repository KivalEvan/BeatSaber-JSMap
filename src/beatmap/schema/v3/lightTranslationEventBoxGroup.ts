import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightTranslationEventBoxGroup } from '../../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { lightTranslationEventBox } from './lightTranslationEventBox.ts';

/**
 * Schema serialization for v3 `Light Translation Event Box Group`.
 */
export const lightTranslationEventBoxGroup: ISchemaContainer<
   IWrapLightTranslationEventBoxGroupAttribute,
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
      return {
         time: data.b ?? 0,
         id: data.g ?? 0,
         boxes: data.e?.map((x) => {
            return lightTranslationEventBox.deserialize(x);
         }) ?? [],
         customData: data.customData ?? {},
      };
   },
};
