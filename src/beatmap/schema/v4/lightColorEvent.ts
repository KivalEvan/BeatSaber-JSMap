import type { ILightColorEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightColorEventAttribute } from '../../../types/beatmap/wrapper/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createLightColorEvent } from '../../core/lightColorEvent.ts';

/**
 * Schema serialization for v4 `Light Color Event`.
 */
export const lightColorEvent: ISchemaContainer<
   IWrapLightColorEventAttribute,
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
