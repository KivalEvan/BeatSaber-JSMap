import type { ISpawnRotationContainer } from './types/container.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createRotationEvent } from '../wrapper/rotationEvent.ts';

/** Serialize beatmap v4 `Rotation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeRotationEvent(data: IWrapRotationEvent): ISpawnRotationContainer {
   return {
      object: { b: data.time },
      data: {
         e: data.executionTime,
         r: data.rotation,
         customData: deepCopy(data.customData),
      },
   };
}

/** Deserialize schema object into beatmap v4 `Rotation Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeRotationEvent(data: ISpawnRotationContainer): IWrapRotationEvent {
   return createRotationEvent({
      time: data.object?.b,
      executionTime: data.data?.e,
      rotation: data.data?.r,
      customData: data.data?.customData,
   });
}
