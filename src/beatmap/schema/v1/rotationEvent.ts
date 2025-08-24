import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IEvent } from './types/event.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { createRotationEvent } from '../wrapper/rotationEvent.ts';
import { EventLaneRotationValue, RotationValueEventValue } from '../../misc/remaps.ts';

/**
 * Schema serialization for v1 `Rotation Event`.
 */
export const rotationEvent: ISchemaContainer<IWrapRotationEvent, IEvent> = {
   serialize(data) {
      let r = data.rotation % 360;
      if (r >= -60 && r <= 60 && r % 15 === 0 && r / 15 !== 0) {
         r = RotationValueEventValue[r] || r + 1360;
      } else r += 1360;
      return {
         _time: data.time,
         _type: data.executionTime === 1 ? 15 : 14,
         _value: r,
      };
   },
   deserialize(data) {
      const value = data._value ?? 0;
      return createRotationEvent({
         time: data._time,
         executionTime: data._type === 15 ? 1 : 0,
         rotation: value >= 1000 ? (value - 1360) % 360 : EventLaneRotationValue[value] ?? 0,
      });
   },
};
