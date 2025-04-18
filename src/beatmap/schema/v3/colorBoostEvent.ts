import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IColorBoostEvent } from '../../../types/beatmap/v3/colorBoostEvent.ts';
import type { IWrapColorBoostEvent } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorBoostEvent } from '../../core/colorBoostEvent.ts';

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
