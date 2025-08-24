import type { INjsEventContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapNJSEvent } from '../../core/types/njsEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createNJSEvent } from '../../core/njsEvent.ts';

/**
 * Schema serialization for v4 `Basic Event`.
 */
export const njsEvent: ISchemaContainer<IWrapNJSEvent, INjsEventContainer> = {
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
