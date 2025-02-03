import type { ISpawnRotationContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v4 `Rotation Event`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   ISpawnRotationContainer
> = {
   serialize(data) {
      return {
         object: { b: data.time },
         data: {
            e: data.executionTime,
            r: data.rotation,
            customData: deepCopy(data.customData),
         },
      };
   },
   deserialize(data) {
      return {
         time: data.object?.b ?? 0,
         executionTime: data.data?.e ?? 0,
         rotation: data.data?.r ?? 0,
         customData: data.data?.customData ?? {},
      };
   },
};
