import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapColorBoostEvent } from '../wrapper/types/colorBoostEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createColorBoostEvent } from '../wrapper/colorBoostEvent.ts';

/**
 * Schema serialization for v2 `Color Boost Event`.
 */
export const colorBoostEvent: ISchemaContainer<IWrapColorBoostEvent, IEvent> = {
   serialize(data) {
      return {
         _time: data.time,
         _type: 5,
         _value: data.toggle ? 1 : 0,
         _floatValue: 0,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createColorBoostEvent({
         time: data._time,
         toggle: !!data._value,
         customData: data._customData,
      });
   },
};
