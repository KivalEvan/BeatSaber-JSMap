import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { IWrapNJSEventAttribute } from '../../../types/beatmap/wrapper/njsEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v2 `NJS Event`.
 */
export const njsEvent: ISchemaContainer<IWrapNJSEventAttribute, IEvent> = {
   serialize(data: IWrapNJSEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: 1000,
         _value: data.easing,
         _floatValue: data.value,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IEvent> = {}): Partial<IWrapNJSEventAttribute> {
      return {
         time: data._time,
         value: data._floatValue,
         easing: data._value,
         previous: 0,
         customData: data._customData,
      };
   },
};
