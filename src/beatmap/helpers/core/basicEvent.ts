import type { EnvironmentAllName } from '../../../types/beatmap/shared/environment.ts';
import { EventLightValue, EventType } from '../../shared/constants.ts';

/** Check if event type is valid. */
export function isValidEventType(type: EventType): boolean {
   // todo: replace with enum once schema changes land
   return (type >= 0 && type <= 19) || (type >= 40 && type <= 43) || type === 100 || type === 1000;
}

/** Check if event type is a light event. */
export function isLightEventType(type: EventType, _environment?: EnvironmentAllName): boolean {
   return (
      type === EventType.BACK_LASERS ||
      type === EventType.RING_LIGHTS ||
      type === EventType.LEFT_LASERS ||
      type === EventType.RIGHT_LASERS ||
      type === EventType.CENTER_LIGHTS ||
      type === EventType.EXTRA_LEFT_LIGHTS ||
      type === EventType.EXTRA_RIGHT_LIGHTS ||
      type === EventType.EXTRA_LEFT_LASERS ||
      type === EventType.EXTRA_RIGHT_LASERS
   );
}
/** Check if event type is a color boost event. */
export function isColorBoostEventType(type: EventType): boolean {
   return type === EventType.COLOR_BOOST;
}
/** Check if event type is a ring event. */
export function isRingEventType(type: EventType, _environment?: EnvironmentAllName): boolean {
   return (
      type === EventType.RING_ROTATION ||
      type === EventType.RING_ZOOM
   );
}
/** Check if event type is a laser rotation event. */
export function isLaserRotationEventType(
   type: EventType,
   _environment?: EnvironmentAllName,
): boolean {
   return (
      type === EventType.LEFT_LASER_ROTATION ||
      type === EventType.RIGHT_LASER_ROTATION
   );
}
/** Check if event type is a lane rotation event. */
export function isLaneRotationEventType(type: EventType): boolean {
   return (
      type === EventType.EARLY_LANE_ROTATION ||
      type === EventType.LATE_LANE_ROTATION
   );
}
/** Check if event type is an extra event. */
export function isExtraEventType(type: EventType, _environment?: EnvironmentAllName): boolean {
   return (
      type === EventType.UTILITY_EVENT_0 ||
      type === EventType.UTILITY_EVENT_1 ||
      type === EventType.UTILITY_EVENT_2 ||
      type === EventType.UTILITY_EVENT_3
   );
}
/** Check if event type is a special event. */
export function isSpecialEventType(type: EventType, _environment?: EnvironmentAllName): boolean {
   return (
      type === EventType.SPECIAL_EVENT_0 ||
      type === EventType.SPECIAL_EVENT_1 ||
      type === EventType.SPECIAL_EVENT_2 ||
      type === EventType.SPECIAL_EVENT_3
   );
}
/** Check if event type is a BPM change. */
export function isBpmChangeEventType(type: EventType): boolean {
   return type === EventType.BPM_CHANGE;
}
/** Check if event type is an NJS change. */
export function isNjsChangeEventType(type: EventType): boolean {
   return type === EventType.NJS_CHANGE;
}

/** Not to be confused with isLightEvent, this checks for event that affects the environment/lighting. */
export function isLightingEventType(type: EventType): boolean {
   return (
      isLightEventType(type) ||
      isRingEventType(type) ||
      isLaserRotationEventType(type) ||
      isExtraEventType(type)
   );
}

/** Check if light event is an off event. */
export function isOffEventValue(value: number): boolean {
   return value === EventLightValue.OFF;
}
/** Check if light event is an on event. */
export function isOnEventValue(value: number): boolean {
   return (
      value === EventLightValue.BLUE_ON ||
      value === EventLightValue.RED_ON ||
      value === EventLightValue.WHITE_ON
   );
}
/** Check if light event is a flash event. */
export function isFlashEventValue(value: number): boolean {
   return (
      value === EventLightValue.BLUE_FLASH ||
      value === EventLightValue.RED_FLASH ||
      value === EventLightValue.WHITE_FLASH
   );
}
/** Check if light event is a fade event. */
export function isFadeEventValue(value: number): boolean {
   return (
      value === EventLightValue.BLUE_FADE ||
      value === EventLightValue.RED_FADE ||
      value === EventLightValue.WHITE_FADE
   );
}
/** Check if light event is a transition event. */
export function isTransitionEventValue(value: number): boolean {
   return (
      value === EventLightValue.BLUE_TRANSITION ||
      value === EventLightValue.RED_TRANSITION ||
      value === EventLightValue.WHITE_TRANSITION
   );
}

/** Check if light event is a blue light. */
export function isBlueEventValue(value: number): boolean {
   return (
      value === EventLightValue.BLUE_ON ||
      value === EventLightValue.BLUE_FLASH ||
      value === EventLightValue.BLUE_FADE ||
      value === EventLightValue.BLUE_TRANSITION
   );
}
/** Check if light event is a red light. */
export function isRedEventValue(value: number): boolean {
   return (
      value === EventLightValue.RED_ON ||
      value === EventLightValue.RED_FLASH ||
      value === EventLightValue.RED_FADE ||
      value === EventLightValue.RED_TRANSITION
   );
}
/** Check if light event is a white light. */
export function isWhiteEventValue(value: number): boolean {
   return (
      value === EventLightValue.WHITE_ON ||
      value === EventLightValue.WHITE_FLASH ||
      value === EventLightValue.WHITE_FADE ||
      value === EventLightValue.WHITE_TRANSITION
   );
}

/** Check if event has old Chroma properties. */
export function isOldChromaEventValue(value: number): boolean {
   return value >= 2000000000;
}
