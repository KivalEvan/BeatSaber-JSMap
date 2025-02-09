import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapBasicEvent } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../../core/basicEvent.ts';

/**
 * Schema serialization for v2 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEvent, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: data.type,
         _value: data.value,
         _floatValue: data.floatValue,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createBasicEvent({
         time: data._time,
         type: data._type,
         value: data._value,
         floatValue: data._floatValue,
         customData: data._customData,
      });
   },
};
