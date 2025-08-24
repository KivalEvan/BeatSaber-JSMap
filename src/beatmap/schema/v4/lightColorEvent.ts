import type { ILightColorEventContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightColorEvent } from '../../core/types/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEvent } from '../../core/lightColorEvent.ts';

/**
 * Schema serialization for v4 `Light Color Event`.
 */
export const lightColorEvent: ISchemaContainer<
   IWrapLightColorEvent,
   ILightColorEventContainer
> = {
   serialize(data) {
      return {
         data: {
            p: data.previous,
            c: data.color,
            e: data.easing,
            b: data.brightness,
            f: data.frequency,
            sb: data.strobeBrightness,
            sf: data.strobeFade,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(data) {
      return createLightColorEvent({
         time: data.time,
         previous: data.data?.p,
         color: data.data?.c,
         frequency: data.data?.f,
         easing: data.data?.e,
         brightness: data.data?.b,
         strobeBrightness: data.data?.sb,
         strobeFade: data.data?.sf,
         customData: data.data?.customData,
      });
   },
};
