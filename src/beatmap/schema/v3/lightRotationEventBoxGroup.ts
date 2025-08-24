import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import type { IWrapLightRotationEventBoxGroup } from '../../core/types/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBoxGroup } from '../../core/lightRotationEventBoxGroup.ts';
import { lightRotationEventBox } from './lightRotationEventBox.ts';

/**
 * Schema serialization for v3 `Light Rotation Event Box Group`.
 */
export const lightRotationEventBoxGroup: ISchemaContainer<
   IWrapLightRotationEventBoxGroup,
   ILightRotationEventBoxGroup
> = {
   serialize(data) {
      return {
         b: data.time,
         g: data.id,
         e: data.boxes.map((x) => {
            return lightRotationEventBox.serialize(x);
         }),
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createLightRotationEventBoxGroup({
         time: data.b,
         id: data.g,
         boxes: data.e?.map((x) => {
            return lightRotationEventBox.deserialize(x);
         }),
         customData: data.customData,
      });
   },
};
