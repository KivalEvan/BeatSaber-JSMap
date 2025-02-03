import type { ILightColorEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightColorEventAttribute } from '../../../types/beatmap/wrapper/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

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
      return {
         time: data.time ?? 0,
         previous: data.data?.p ?? 0,
         color: data.data?.c ?? 0,
         frequency: data.data?.f ?? 0,
         easing: data.data?.e ?? 0,
         brightness: data.data?.b ?? 0,
         strobeBrightness: data.data?.sb ?? 0,
         strobeFade: data.data?.sf ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
