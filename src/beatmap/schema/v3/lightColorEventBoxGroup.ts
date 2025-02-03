import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightColorEventBoxGroup } from '../../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import type { IWrapLightColorEventBoxGroupAttribute } from '../../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { lightColorEventBox } from './lightColorEventBox.ts';

/**
 * Schema serialization for v3 `Light Color Event Box Group`.
 */
export const lightColorEventBoxGroup: ISchemaContainer<
   IWrapLightColorEventBoxGroupAttribute,
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
      return {
         time: data.b ?? 0,
         id: data.g ?? 0,
         boxes: data.e?.map((x) => {
            return lightColorEventBox.deserialize(x);
         }) ?? [],
         customData: data.customData ?? {},
      };
   },
};
