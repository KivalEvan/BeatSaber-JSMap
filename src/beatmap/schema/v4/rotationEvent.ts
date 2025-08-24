import type { ISpawnRotationContainer } from './types/container.ts';
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IWrapRotationEvent } from '../../core/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
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
