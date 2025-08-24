import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IColorBoostEvent } from './types/colorBoostEvent.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/**
 * Schema serialization for v3 `Color Boost Event`.
 */
export const colorBoostEvent: ISchemaContainer<IWrapColorBoostEvent, IColorBoostEvent> = {
   serialize(data) {
      return {
         b: data.time,
         o: data.toggle,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data = {}) {
      return createColorBoostEvent({
         time: data.b,
         toggle: !!data.o,
         customData: data.customData,
      });
   },
};
