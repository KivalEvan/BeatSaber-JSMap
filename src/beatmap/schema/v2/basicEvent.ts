import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapBasicEventAttribute } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEventAttribute, IEvent> = {
   serialize(data: IWrapBasicEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: data.type,
         _value: data.value,
         _floatValue: data.floatValue,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data._time ?? 0,
         type: data._type ?? 0,
         value: data._value ?? 0,
         floatValue: data._floatValue ?? 0,
         customData: data._customData ?? {},
      };
   },
};
