import type { IEventBoxGroupContainer, ILightRotationBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightRotationEventBoxGroup } from '../wrapper/types/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import { lightRotationEventBox } from './lightRotationEventBox.ts';

/**
 * Schema serialization for v4 `Light Rotation Event Box Group`.
 */
export const lightRotationEventBoxGroup: ISchemaContainer<
   IWrapLightRotationEventBoxGroup,
   IEventBoxGroupContainer<ILightRotationBoxContainer>
> = {
   serialize(data) {
      return {
         object: {
            t: EventBoxType.ROTATION,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map((x) => {
            return lightRotationEventBox.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return createLightRotationEventBoxGroup({
         time: data.object?.b,
         id: data.object?.g,
         boxes: data.boxData?.map((x) => {
            return lightRotationEventBox.deserialize(x);
         }),
         customData: data.object?.customData,
      });
   },
};
