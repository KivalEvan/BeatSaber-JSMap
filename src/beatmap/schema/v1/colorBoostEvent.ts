import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapColorBoostEvent } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';
import { createColorBoostEvent } from '../../core/colorBoostEvent.ts';

/**
 * Schema serialization for v1 `Color Boost Event`.
 */
export const colorBoostEvent: ISchemaContainer<IWrapColorBoostEvent, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 5,
         _value: data.toggle ? 1 : 0,
      };
   },
   deserialize(data) {
      return createColorBoostEvent({
         time: data._time,
         toggle: data._value === 1,
      });
   },
};
