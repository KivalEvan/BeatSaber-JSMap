import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEvent } from '../../../types/beatmap/v3/basicEvent.ts';
import type { IWrapNJSEventAttribute } from '../../../types/beatmap/wrapper/njsEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `NJS Event`.
 */
export const njsEvent: ISchemaContainer<IWrapNJSEventAttribute, IBasicEvent> = {
   serialize(data: IWrapNJSEventAttribute): IBasicEvent {
      return {
         b: data.time,
         et: 1000,
         i: data.easing,
         f: data.value,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data: Partial<IBasicEvent> = {}): Partial<IWrapNJSEventAttribute> {
      return {
         time: data.b,
         value: data.f,
         easing: data.i,
         previous: 0,
         customData: data.customData,
      };
   },
};
