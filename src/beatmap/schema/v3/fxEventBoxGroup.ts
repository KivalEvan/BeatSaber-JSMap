import type { IEventBoxGroupContainer, IFxEventFloatBoxContainer } from './types/container.ts';
import { FxType } from '../shared/types/constants.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IFxEventBox } from './types/fxEventBox.ts';
import type { IWrapFxEventBoxGroup } from '../../core/types/fxEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventBoxGroup } from '../../core/fxEventBoxGroup.ts';
import { fxEventBox } from './fxEventBox.ts';

/**
 * Schema serialization for v3 `FX Event Box Group`.
 */
export const fxEventBoxGroup: ISchemaContainer<
   IWrapFxEventBoxGroup,
   IEventBoxGroupContainer<IFxEventBox, IFxEventFloatBoxContainer>
> = {
   serialize(data) {
      return {
         object: {
            t: FxType.FLOAT,
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
