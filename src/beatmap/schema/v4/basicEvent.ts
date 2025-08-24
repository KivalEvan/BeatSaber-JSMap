import type { IBasicEventContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapBasicEvent } from '../wrapper/types/basicEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBasicEvent } from '../wrapper/basicEvent.ts';

/**
 * Schema serialization for v4 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEvent, IBasicEventContainer> = {
   serialize(data) {
      return {
         object: {
            b: data.time,
            i: 0,
            customData: {},
         },
         data: {
            t: data.type,
            i: data.value,
            f: data.floatValue,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return createBasicEvent({
         time: data.object?.b,
         type: data.data?.t,
         value: data.data?.i,
         floatValue: data.data?.f,
         customData: data.data?.customData,
      });
   },
};
