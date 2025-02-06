import type { IColorBoostEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapColorBoostEventAttribute } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createColorBoostEvent } from '../../core/colorBoostEvent.ts';

/**
 * Schema serialization for v4 `Color Boost Event`.
 */
export const colorBoostEvent: ISchemaContainer<
   IWrapColorBoostEventAttribute,
   IColorBoostEventContainer
> = {
   serialize(data) {
      return {
         object: {
            b: data.time,
            i: 0,
            customData: {},
         },
         data: {
            b: data.toggle ? 1 : 0,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return createColorBoostEvent({
         time: data.object?.b,
         toggle: !!data.data?.b,
         customData: data.data?.customData,
      });
   },
};
