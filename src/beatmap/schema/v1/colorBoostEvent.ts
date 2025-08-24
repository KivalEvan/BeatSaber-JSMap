import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IEvent } from './types/event.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

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
