import type { EnvironmentName } from '../../schema/shared/types/environment.ts';
import { EventLightValue, EventType } from '../../schema/shared/types/constants.ts';

/** Check if event type is valid. */
export function isValidEventType(type: number): boolean {
   // todo: replace with enum once schema changes land
   return (
      (type >= 0 && type <= 19) ||
      (type >= 40 && type <= 43) ||
      type === 100 ||
      type === 1000
   );
}

/** Check if event type is a color boost event. */
export function isColorBoostEventType(type: number): boolean {
   return type === EventType.COLOR_BOOST;
}

/** Check if event type is a lane rotation event. */
export function isLaneRotationEventType(type: number): boolean {
   return (
      type === EventType.EARLY_LANE_ROTATION ||
      type === EventType.LATE_LANE_ROTATION
   );
}

/** Check if event type is a special event. */
export function isSpecialEventType(
   type: number,
   _environment?: EnvironmentName,
): boolean {
   return (
      type === EventType.SPECIAL_EVENT_0 ||
      type === EventType.SPECIAL_EVENT_1 ||
      type === EventType.SPECIAL_EVENT_2 ||
      type === EventType.SPECIAL_EVENT_3
   );
}

/** Check if event type is a BPM change. */
export function isBpmChangeEventType(type: number): boolean {
   return type === EventType.BPM_CHANGE;
}
/**
 *  Check if event type is an NJS change. */
export function isNjsChangeEventType(type: number): boolean {
   return type === EventType.NJS_CHANGE;
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
