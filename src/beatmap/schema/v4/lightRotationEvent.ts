import type { ILightRotationEventContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapLightRotationEvent } from '../wrapper/types/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEvent } from '../wrapper/lightRotationEvent.ts';

/**
 * Schema serialization for v4 `Light Rotation Event`.
 */
export const lightRotationEvent: ISchemaContainer<
   IWrapLightRotationEvent,
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
      return createLightRotationEvent({
         time: data.time,
         previous: data.data?.p,
         easing: data.data?.e,
         loop: data.data?.l,
         rotation: data.data?.r,
         direction: data.data?.d,
         customData: data.data?.customData,
      });
   },
};
