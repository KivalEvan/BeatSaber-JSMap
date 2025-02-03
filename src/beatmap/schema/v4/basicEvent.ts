import type { IBasicEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapBasicEventAttribute } from '../../../types/beatmap/wrapper/basicEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

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
      return {
         time: data.object?.b ?? 0,
         type: data.data?.t ?? 0,
         value: data.data?.i ?? 0,
         floatValue: data.data?.f ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
