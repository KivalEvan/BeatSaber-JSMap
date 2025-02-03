import type { IFxEventFloatContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventFloatAttribute } from '../../../types/beatmap/wrapper/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `FX Event Float`.
 */
export const fxEventFloat: ISchemaContainer<IWrapFxEventFloatAttribute, IFxEventFloatContainer> = {
   serialize(data) {
      return {
         data: {
            p: data.previous,
            e: data.easing,
            v: data.value,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(data) {
      return {
         time: data.time ?? 0,
         previous: data.data?.p ?? 0,
         easing: data.data?.e ?? 0,
         value: data.data?.v ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
