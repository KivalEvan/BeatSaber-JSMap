import type { INjsEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapNJSEventAttribute } from '../../../types/beatmap/wrapper/njsEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Basic Event`.
 */
export const njsEvent: ISchemaContainer<IWrapNJSEventAttribute, INjsEventContainer> = {
   serialize(data) {
      return {
         object: {
            b: data.time,
            i: 0,
            customData: {},
         },
         data: {
            d: data.value,
            p: data.previous,
            e: data.easing,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return {
         time: data.object?.b ?? 0,
         value: data.data?.d ?? 0,
         previous: data.data?.p ?? 0,
         easing: data.data?.e ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
