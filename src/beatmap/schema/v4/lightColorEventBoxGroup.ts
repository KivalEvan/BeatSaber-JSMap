import type { IEventBoxGroupContainer, ILightColorBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBoxGroup } from '../wrapper/lightColorEventBoxGroup.ts';
import { lightColorEventBox } from './lightColorEventBox.ts';

/**
 * Schema serialization for v4 `Light Color Event Box Group`.
 */
export const lightColorEventBoxGroup: ISchemaContainer<
   IWrapLightColorEventBoxGroup,
   IEventBoxGroupContainer<ILightColorBoxContainer>
> = {
   serialize(data) {
      return {
         object: {
            t: EventBoxType.COLOR,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map((x) => {
            return lightColorEventBox.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return createLightColorEventBoxGroup({
         time: data.object?.b,
         id: data.object?.g,
         boxes: data.boxData?.map((x) => {
            return lightColorEventBox.deserialize(x);
         }),
         customData: data.object?.customData,
      });
   },
};
