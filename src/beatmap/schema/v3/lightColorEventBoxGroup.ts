import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import { lightColorEventBox } from './lightColorEventBox.ts';

/**
 * Schema serialization for v3 `Light Color Event Box Group`.
 */
export const lightColorEventBoxGroup: ISchemaContainer<
   IWrapLightColorEventBoxGroup,
   ILightColorEventBoxGroup
> = {
   serialize(data) {
      return {
         b: data.time,
         g: data.id,
         e: data.boxes.map((x) => {
            return lightColorEventBox.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createLightColorEventBoxGroup({
         time: data.b,
         id: data.g,
         boxes: data.e?.map((x) => {
            return lightColorEventBox.deserialize(x);
         }),
         customData: data.customData,
      });
   },
};
