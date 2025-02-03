import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v3/fxEventFloat.ts';
import type { IWrapFxEventFloatAttribute } from '../../../types/beatmap/wrapper/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `FX Event Float`.
 */
export const fxEventFloat: ISchemaContainer<IWrapFxEventFloatAttribute, IFxEventFloat> = {
   serialize(data) {
      return {
         b: data.time,
         i: data.easing,
         p: data.previous,
         v: data.value,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         easing: data.i ?? 0,
         previous: data.p ?? 0,
         value: data.v ?? 0,
         customData: data.customData ?? {},
      };
   },
};
