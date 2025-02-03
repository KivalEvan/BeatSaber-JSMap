import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventInt } from '../../../types/beatmap/v3/fxEventInt.ts';
import type { IWrapFxEventIntAttribute } from '../../../types/beatmap/wrapper/fxEventInt.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `FX Event Int`.
 */
export const fxEventInt: ISchemaContainer<IWrapFxEventIntAttribute, IFxEventInt> = {
   serialize(data) {
      return {
         b: data.time,
         p: data.previous,
         v: data.value,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         previous: data.p ?? 0,
         value: data.v ?? 0,
         customData: data.customData ?? {},
      };
   },
};
