import type { ILightRotationEventContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapLightRotationEventAttribute } from '../../../types/beatmap/wrapper/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Light Rotation Event`.
 */
export const lightRotationEvent: ISchemaContainer<
   IWrapLightRotationEventAttribute,
   ILightRotationEventContainer
> = {
   serialize(data) {
      return {
         data: {
            p: data.previous,
            l: data.loop,
            e: data.easing,
            r: data.rotation,
            d: data.direction,
            customData: deepCopy(data.customData),
         },
         time: data.time,
      };
   },
   deserialize(data) {
      return {
         time: data.time ?? 0,
         previous: data.data?.p ?? 0,
         easing: data.data?.e ?? 0,
         loop: data.data?.l ?? 0,
         rotation: data.data?.r ?? 0,
         direction: data.data?.d ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
