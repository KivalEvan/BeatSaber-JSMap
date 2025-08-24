import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IRotationEvent } from './types/rotationEvent.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createRotationEvent } from '../wrapper/rotationEvent.ts';

/**
 * Schema serialization for v3 `Rotation Event`.
 */
export const rotationEvent: ISchemaContainer<IWrapRotationEvent, IRotationEvent> = {
   serialize(data) {
      return {
         b: data.time,
         e: data.executionTime,
         r: data.rotation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return createRotationEvent({
         time: data.b,
         executionTime: data.e,
         rotation: data.r,
         customData: data.customData,
      });
   },
};
