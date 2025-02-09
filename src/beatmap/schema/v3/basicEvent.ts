import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEvent } from '../../../types/beatmap/v3/basicEvent.ts';
import type { IWrapBasicEvent } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../../core/basicEvent.ts';

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
