import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IBasicEvent } from './types/basicEvent.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../wrapper/basicEvent.ts';

/**
 * Schema serialization for v3 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEvent, IBasicEvent> = {
   serialize(data) {
      return {
         b: data.time,
         et: data.type,
         i: data.value,
         f: data.floatValue,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createBasicEvent({
         time: data.b,
         type: data.et,
         value: data.i,
         floatValue: data.f,
         customData: data.customData,
      });
   },
};
