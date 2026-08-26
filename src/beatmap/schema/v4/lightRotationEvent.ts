import type { ILightRotationEventContainer } from './types/container.ts';
import type { IWrapLightRotationEvent } from '../wrapper/types/lightRotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightRotationEvent } from '../wrapper/lightRotationEvent.ts';

/** Serialize beatmap v4 `Light Rotation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightRotationEvent(
   data: IWrapLightRotationEvent,
): ILightRotationEventContainer {
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
}

/** Deserialize schema object into beatmap v4 `Light Rotation Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightRotationEvent(
   data: ILightRotationEventContainer,
): IWrapLightRotationEvent {
   return createLightRotationEvent({
      time: data.time,
      previous: data.data?.p,
      easing: data.data?.e,
      loop: data.data?.l,
      rotation: data.data?.r,
      direction: data.data?.d,
      customData: data.data?.customData,
   });
}
