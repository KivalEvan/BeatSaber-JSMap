import type { ISpawnRotationContainer } from '../../../types/beatmap/container/v4.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapRotationEvent } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createRotationEvent } from '../../core/rotationEvent.ts';

/**
 * Schema serialization for v4 `Rotation Event`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export const rotationEvent: ISchemaContainer<
   IWrapRotationEvent,
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
      return createRotationEvent({
         time: data.object?.b,
         executionTime: data.data?.e,
         rotation: data.data?.r,
         customData: data.data?.customData,
      });
   },
};
