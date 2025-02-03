import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapColorBoostEventAttribute } from '../../../types/beatmap/wrapper/colorBoostEvent.ts';

/**
 * Schema serialization for v1 `Color Boost Event`.
 */
export const colorBoostEvent: ISchemaContainer<IWrapColorBoostEventAttribute, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 5,
         _value: data.toggle ? 1 : 0,
      };
   },
   deserialize(data) {
      return {
         time: data._time ?? 0,
         toggle: data._value === 1,
         customData: {},
      };
   },
};
