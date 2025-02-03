import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IRotationEvent } from '../../../types/beatmap/v3/rotationEvent.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';

/**
 * Schema serialization for v3 `Rotation Event`.
 */
export const rotationEvent: ISchemaContainer<IWrapRotationEventAttribute, IRotationEvent> = {
   serialize(data) {
      return {
         b: data.time,
         e: data.executionTime,
         r: data.rotation,
         customData: deepCopy(data.customData),
      };
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         executionTime: data.e ?? 0,
         rotation: data.r ?? 0,
         customData: data.customData ?? {},
      };
   },
};
