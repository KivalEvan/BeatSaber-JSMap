import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IWrapRotationEvent } from '../wrapper/types/rotationEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createRotationEvent } from '../wrapper/rotationEvent.ts';
import { EventLaneRotationValue, RotationValueEventValue } from '../../misc/remaps.ts';

/** Serialize beatmap v2 `Rotation Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeRotationEvent(data: IWrapRotationEvent): IEvent {
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
}

/** Deserialize schema object into beatmap v2 `Rotation Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeRotationEvent(data: IEvent): IWrapRotationEvent {
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
}
