import type {
   IEventBoxGroupContainer,
   IFxEventFloatBoxContainer,
} from '../../../types/beatmap/container/v3.ts';
import { FxType } from '../../../types/beatmap/shared/constants.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventBox } from '../../../types/beatmap/v3/fxEventBox.ts';
import type { IWrapFxEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { fxEventBox } from './fxEventBox.ts';

/**
 * Schema serialization for v3 `FX Event Box Group`.
 */
export const fxEventBoxGroup: ISchemaContainer<
   IWrapFxEventBoxGroupAttribute,
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
      return {
         time: data.object?.b ?? 0,
         id: data.object?.g ?? 0,
         boxes: data.boxData?.map((x) => {
            return fxEventBox.deserialize(x);
         }) ?? [],
         customData: data.object?.customData ?? {},
      };
   },
};
