import type { IFxEventFloatContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapFxEventFloat } from '../wrapper/types/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventFloat } from '../wrapper/fxEventFloat.ts';

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
