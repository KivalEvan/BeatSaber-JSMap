import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IFxEventInt } from './types/fxEventInt.ts';
import type { IWrapFxEventInt } from '../../core/types/fxEventInt.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createFxEventInt } from '../../core/fxEventInt.ts';

/**
 * Schema serialization for v3 `FX Event Int`.
 */
export const fxEventInt: ISchemaContainer<IWrapFxEventInt, IFxEventInt> = {
   serialize(data) {
      return {
         b: data.time,
         p: data.previous,
         v: data.value,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createFxEventInt({
         time: data.b,
         previous: data.p,
         value: data.v,
         customData: data.customData,
      });
   },
};
