import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v3/lightRotationEvent.ts';
import type { IWrapLightRotationEvent } from '../../../types/beatmap/wrapper/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createLightRotationEvent } from '../../core/lightRotationEvent.ts';

/**
 * Schema serialization for v3 `Light Rotation Event`.
 */
export const lightRotationEvent: ISchemaContainer<
   IWrapLightRotationEvent,
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
      return createLightRotationEvent({
         time: data.b,
         easing: data.e,
         loop: data.l,
         direction: data.o,
         previous: data.p,
         rotation: data.r,
         customData: data.customData,
      });
   },
};
