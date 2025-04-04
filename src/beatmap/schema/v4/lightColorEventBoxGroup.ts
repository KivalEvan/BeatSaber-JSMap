import type {
   IEventBoxGroupContainer,
   ILightColorBoxContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightColorEventBoxGroup } from '../../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEventBoxGroup } from '../../core/lightColorEventBoxGroup.ts';
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
