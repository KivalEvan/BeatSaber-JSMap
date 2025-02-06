import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IRotationEvent } from '../../../types/beatmap/v3/rotationEvent.ts';
import type { IWrapRotationEvent } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { createRotationEvent } from '../../core/rotationEvent.ts';

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
