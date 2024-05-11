import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import { deepCopy } from '../../../utils/misc.ts';
import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { clamp } from '../../../utils/math.ts';
import { EventLaneRotationValue } from '../../shared/constants.ts';

export const rotationEvent: ISchemaContainer<
   IWrapRotationEventAttribute,
   IEvent
> = {
   defaultValue: {
      _time: 0,
      _type: 14,
      _value: 0,
      _floatValue: 0,
      _customData: {},
   } as Required<IEvent>,
   // FIXME: Rotation event rotation value fix
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
         _floatValue: 0,
         _customData: deepCopy(data.customData),
      };
   },
   deserialize(
      data: Partial<IEvent> = {},
   ): Partial<IWrapRotationEventAttribute> {
      const value = data._value ?? this.defaultValue._value;
      return {
         time: data._time,
         executionTime: data._type === 14 ? 0 : 1,
         rotation: typeof data._customData?._rotation === 'number'
            ? data._customData._rotation
            : value >= 1000
            ? (value - 1360) % 360
            : EventLaneRotationValue[value] ?? 0,
         customData: deepCopy(
            data._customData ?? this.defaultValue._customData,
         ),
      };
   },
   isValid(_: IWrapRotationEventAttribute): boolean {
      return true;
   },
   isChroma(_: IWrapRotationEventAttribute): boolean {
      return false;
   },
   isNoodleExtensions(data: IWrapRotationEventAttribute): boolean {
      return typeof data.customData._rotation === 'number';
   },
   isMappingExtensions(data: IWrapRotationEventAttribute): boolean {
      return data.rotation >= 1000 && data.rotation <= 1720;
   },
};
