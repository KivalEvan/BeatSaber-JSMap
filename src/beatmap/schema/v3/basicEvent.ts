import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEvent } from '../../../types/beatmap/v3/basicEvent.ts';
import type { IWrapBasicEventAttribute } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEventAttribute, IBasicEvent> = {
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
      return {
         time: data.b ?? 0,
         type: data.et ?? 0,
         value: data.i ?? 0,
         floatValue: data.f ?? 0,
         customData: data.customData ?? {},
      };
   },
};
