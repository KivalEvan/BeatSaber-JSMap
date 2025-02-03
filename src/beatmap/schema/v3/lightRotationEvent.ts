import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v3/lightRotationEvent.ts';
import type { IWrapLightRotationEventAttribute } from '../../../types/beatmap/wrapper/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Light Rotation Event`.
 */
export const lightRotationEvent: ISchemaContainer<
   IWrapLightRotationEventAttribute,
   ILightRotationEvent
> = {
   serialize(data) {
      return {
         b: data.time,
         e: data.easing,
         l: data.loop,
         o: data.direction,
         p: data.previous,
         r: data.rotation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         easing: data.e ?? 0,
         loop: data.l ?? 0,
         direction: data.o ?? 0,
         previous: data.p ?? 0,
         rotation: data.r ?? 0,
         customData: data.customData ?? {},
      };
   },
};
