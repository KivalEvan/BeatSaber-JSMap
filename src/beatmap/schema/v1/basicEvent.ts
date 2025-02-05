import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapBasicEventAttribute } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { createBasicEvent } from '../../core/basicEvent.ts';

/**
 * Schema serialization for v1 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEventAttribute, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: data.type,
         _value: data.value,
      };
   },
   deserialize(data) {
      return createBasicEvent({
         time: data._time,
         type: data._type,
         value: data._value,
         floatValue: 1,
      });
   },
};
