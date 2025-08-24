import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightRotationEvent } from './types/lightRotationEvent.ts';
import type { IWrapLightRotationEvent } from '../wrapper/types/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEvent } from '../wrapper/lightRotationEvent.ts';

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
