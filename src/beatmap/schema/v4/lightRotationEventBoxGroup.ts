import type {
   IEventBoxGroupContainer,
   ILightRotationBoxContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightRotationEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { lightRotationEventBox } from './lightRotationEventBox.ts';

/**
 * Schema serialization for v4 `Light Rotation Event Box Group`.
 */
export const lightRotationEventBoxGroup: ISchemaContainer<
   IWrapLightRotationEventBoxGroupAttribute,
   IEventBoxGroupContainer<ILightRotationBoxContainer>
> = {
   serialize(
      data,
   ) {
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
      return {
         time: data.object?.b ?? 0,
         id: data.object?.g ?? 0,
         boxes: data.boxData?.map((x) => {
            return lightRotationEventBox.deserialize(x);
         }) ?? [],
         customData: data.object?.customData ?? {},
      };
   },
};
