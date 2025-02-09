import type { IFxEventFloatContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapFxEventFloat } from '../../../types/beatmap/wrapper/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventFloat } from '../../core/fxEventFloat.ts';

/**
 * Schema serialization for v4 `FX Event Float`.
 */
export const fxEventFloat: ISchemaContainer<IWrapFxEventFloat, IFxEventFloatContainer> = {
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
      return createFxEventFloat({
         time: data.time,
         previous: data.data?.p,
         easing: data.data?.e,
         value: data.data?.v,
         customData: data.data?.customData,
      });
   },
};
