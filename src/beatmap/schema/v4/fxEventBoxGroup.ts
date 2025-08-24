import type { IEventBoxGroupContainer, IFxEventFloatBoxContainer } from './types/container.ts';
import { EventBoxType } from '../shared/types/constants.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapFxEventBoxGroup } from '../wrapper/types/fxEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBoxGroup } from '../wrapper/fxEventBoxGroup.ts';
import { fxEventBox } from './fxEventBox.ts';

/**
 * Schema serialization for v4 `FX Event Box Group`.
 */
export const fxEventBoxGroup: ISchemaContainer<
   IWrapFxEventBoxGroup,
   IEventBoxGroupContainer<IFxEventFloatBoxContainer>
> = {
   serialize(data) {
      return {
         object: {
            t: EventBoxType.FX_FLOAT,
            b: data.time,
            g: data.id,
            e: [],
            customData: deepCopy(data.customData),
         },
         boxData: data.boxes.map((x) => {
            return fxEventBox.serialize(x);
         }),
      };
   },
   deserialize(data) {
      return createFxEventBoxGroup({
         time: data.object?.b,
         id: data.object?.g,
         boxes: data.boxData?.map((x) => {
            return fxEventBox.deserialize(x);
         }),
         customData: data.object?.customData,
      });
   },
};
