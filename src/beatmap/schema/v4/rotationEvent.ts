import type { ISpawnRotationContainer } from './types/container.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createRotationEvent } from '../wrapper/rotationEvent.ts';
import type { IDeserializationOptions } from '../shared/types/schema.ts';

/** Serialize unsupported legacy v4 rotation-event data for compatibility tooling.
 * Do not add the result to v4 beatmaps. Use per-object lane rotations instead.
 * @deprecated Kept only for optional cleanup of legacy data.
 * @param data The unwrapped beatmap object.
 * @returns The unsupported legacy schema representation.
 */
export function serializeRotationEvent(data: IWrapRotationEvent): ISpawnRotationContainer {
   return {
      object: { b: data.time },
      data: {
         t: data.executionTime,
         r: data.rotation,
         customData: deepCopy(data.customData),
      },
   };
}

/** Read unsupported legacy v4 rotation-event data for optional cleanup.
 * @deprecated Kept only for optional cleanup of legacy data.
 * @param data The serialized schema object.
 * @param options The custom-data ownership options.
 * @returns The unwrapped beatmap object.
 */
export function deserializeRotationEvent(
   data: ISpawnRotationContainer,
   options?: IDeserializationOptions,
): IWrapRotationEvent {
   return createRotationEvent({
      time: data.object?.b,
      executionTime: data.data?.t,
      rotation: data.data?.r,
      customData: data.data?.customData,
   }, options);
}
