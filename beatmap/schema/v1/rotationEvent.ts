import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IEvent } from '../../../types/beatmap/v1/event.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { clamp } from '../../../utils/math.ts';
import { EventLaneRotationValue } from '../../shared/constants.ts';

const defaultValue = {
   _time: 0,
   _type: 14,
   _value: 0,
} as Required<IEvent>;
export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   IEvent
> = {
   defaultValue,
   // FIXME: fix rotation conversion
   serialize(data: IWrapRotationEventAttribute): IEvent {
      return {
         _time: data.time,
         _type: data.executionTime === 1 ? 15 : 14,
         _value: Math.floor((clamp(data.rotation, -60, 60) + 60) / 15) < 6
            ? Math.max(
               Math.floor((clamp(data.rotation, -60, 60) + 60) / 15),
               3,
            )
            : Math.floor((clamp(data.rotation, -60, 60) + 60) / 15) - 2,
      };
   },
   deserialize(
      data: Partial<IEvent> = {},
   ): Partial<IWrapRotationEventAttribute> {
      const value = data._value ?? defaultValue._value;
      return {
         time: data._time ?? defaultValue._time,
         executionTime: data._type === 14 ? 0 : 1,
         rotation: value >= 1000 ? (value - 1360) % 360 : EventLaneRotationValue[value] ?? 0,
      };
   },
   isValid(_: IWrapRotationEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isMappingExtensions(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
};
