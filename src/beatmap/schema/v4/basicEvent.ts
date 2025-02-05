import type { IBasicEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapBasicEventAttribute } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createBasicEvent } from '../../core/basicEvent.ts';

/**
 * Schema serialization for v4 `Basic Event`.
 */
export const basicEvent: ISchemaContainer<IWrapBasicEventAttribute, IBasicEventContainer> = {
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
