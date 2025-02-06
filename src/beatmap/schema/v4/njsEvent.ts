import type { INjsEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapNJSEventAttribute } from '../../../types/beatmap/wrapper/njsEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createNJSEvent } from '../../core/njsEvent.ts';

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
      return createNJSEvent({
         time: data.object?.b,
         value: data.data?.d,
         previous: data.data?.p,
         easing: data.data?.e,
         customData: data.data?.customData,
      });
   },
};
