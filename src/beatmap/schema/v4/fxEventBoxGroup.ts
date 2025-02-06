import type {
   IEventBoxGroupContainer,
   IFxEventFloatBoxContainer,
} from '../../../types/beatmap/container/v4.ts';
import { EventBoxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventBoxGroup } from '../../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createFxEventBoxGroup } from '../../core/fxEventBoxGroup.ts';
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
