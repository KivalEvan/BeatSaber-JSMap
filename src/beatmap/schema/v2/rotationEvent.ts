import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapRotationEvent } from '../../core/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createRotationEvent } from '../../core/rotationEvent.ts';
import { EventLaneRotationValue, RotationValueEventValue } from '../../misc/remaps.ts';

/**
 * Schema serialization for v2 `Rotation Event`.
 */
export const rotationEvent: ISchemaContainer<IWrapRotationEvent, IEvent> = {
   serialize(data) {
      let r = data.rotation % 360;
      const customData = deepCopy(data.customData);
      if (r >= -60 && r <= 60 && r % 15 === 0 && r / 15 !== 0) {
         r = RotationValueEventValue[r] || r + 1360;
      } else {
         customData._rotation = r;
         r += 1360;
      }
      return {
         _time: data.time,
         _type: data.executionTime === 1 ? 15 : 14,
         _value: r,
         _floatValue: 0,
         _customData: customData,
      };
   },
   deserialize(data) {
      const value = data._value ?? 0;
      return createRotationEvent({
         time: data._time,
         executionTime: data._type === 15 ? 1 : 0,
         rotation: typeof data._customData?._rotation === 'number'
            ? data._customData._rotation
            : value >= 1000
            ? (value - 1360) % 360
            : EventLaneRotationValue[value],
         customData: data._customData,
      });
   },
};
