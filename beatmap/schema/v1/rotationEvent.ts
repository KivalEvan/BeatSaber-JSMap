import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { EventLaneRotationValue } from '../../shared/constants.ts';

const rotationValueTable: Record<string, number> = {
   '-60': 0,
   '-45': 1,
   '-30': 2,
   '-15': 3,
   '15': 4,
   '30': 5,
   '45': 6,
   '60': 7,
};

export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   IEvent
> = {
   serialize(data: IWrapRotationEventAttribute): IEvent {
      let r = data.rotation % 360;
      if (r >= -60 && r <= 60 && r % 15 === 0 && r / 15 !== 0) {
         r = rotationValueTable[r.toString()] || r + 1360;
      } else r += 1360;
      return {
         _time: data.time,
         _type: data.executionTime === 1 ? 15 : 14,
         _value: r,
      };
   },
   deserialize(
      data: Partial<IEvent> = {},
   ): Partial<IWrapRotationEventAttribute> {
      const value = data._value ?? 0;
      return {
         time: data._time,
         executionTime: data._type === 15 ? 1 : 0,
         rotation: value >= 1000 ? (value - 1360) % 360 : EventLaneRotationValue[value] ?? 0,
      };
   },
};
