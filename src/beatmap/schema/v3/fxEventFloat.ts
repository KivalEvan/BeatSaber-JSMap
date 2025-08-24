import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IFxEventFloat } from './types/fxEventFloat.ts';
import type { IWrapFxEventFloat } from '../../core/types/fxEventFloat.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventFloat } from '../../core/fxEventFloat.ts';

/**
 * Schema serialization for v3 `FX Event Float`.
 */
export const fxEventFloat: ISchemaContainer<IWrapFxEventFloat, IFxEventFloat> = {
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
      return createFxEventFloat({
         time: data.b,
         easing: data.i,
         previous: data.p,
         value: data.v,
         customData: data.customData,
      });
   },
};
