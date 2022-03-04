import {
    BasicEvent,
    BasicEventBoost,
    BasicEventLaneRotation,
    BasicEventLaserRotation,
    BasicEventLight,
    BasicEventRing,
    BasicEventZoom,
    BasicEventExtra,
    BasicEventSpecial,
    BasicEventBPMChange,
} from './types/basicEvent.ts';

/** Check if light event is an off event.
 * ```ts
 * if (isOff(event)) {}
 * ```
 * ---
 * This may check non-light event too.
 */
export const isOff = (event: BasicEvent): boolean => {
    return event.i === 0;
};

/** Check if light event is an on event.
 * ```ts
 * if (isOn(event)) {}
 * ```
 * ---
 * This may check non-light event too.
 */
export const isOn = (event: BasicEvent): boolean => {
    return event.i === 1 || event.i === 5;
};

/** Check if light event is a flash event.
 * ```ts
 * if (isFlash(event)) {}
 * ```
 * ---
 * This may check non-light event too.
 */
export const isFlash = (event: BasicEvent): boolean => {
    return event.i === 2 || event.i === 6;
};

/** Check if light event is a fade event.
 * ```ts
 * if (isFade(event)) {}
 * ```
 * ---
 * This may check non-light event too.
 */
export const isFade = (event: BasicEvent): boolean => {
    return event.i === 3 || event.i === 7;
};

/** Check if light event is a transition event.
 * ```ts
 * if (isTransition(event)) {}
 * ```
 * ---
 * This may check non-light event too.
 */
export const isTransition = (event: BasicEvent): boolean => {
    return event.i === 4 || event.i === 8;
};

/** Check if event is a valid type.
 * ```ts
 * if (isValidType(event)) {}
 * ```
 */
export const isValidType = (event: BasicEvent): boolean => {
    return (event.et >= 0 && event.et <= 17) || event.et === 100;
};

/** Check if event is a light event.
 * ```ts
 * if (isLightEvent(event)) {}
 * ```
 */
export const isLightEvent = (event: BasicEvent): event is BasicEventLight => {
    return (
        event.et === 0 ||
        event.et === 1 ||
        event.et === 2 ||
        event.et === 3 ||
        event.et === 4 ||
        event.et === 6 ||
        event.et === 7 ||
        event.et === 10 ||
        event.et === 11
    );
};

/** Check if event is a boost event.
 * ```ts
 * if (isColorBoost(event)) {}
 * ```
 */
export const isColorBoost = (event: BasicEvent): event is BasicEventBoost => {
    return event.et === 5;
};

/** Check if event is a ring event.
 * ```ts
 * if (isRingEvent(event)) {}
 * ```
 * ---
 * This does not check for ring zoom.
 */
export const isRingEvent = (event: BasicEvent): event is BasicEventRing => {
    return event.et === 8;
};

/** Check if event is a ring zoom event.
 * ```ts
 * if (isZoomEvent(event)) {}
 * ```
 */
export const isZoomEvent = (event: BasicEvent): event is BasicEventZoom => {
    return event.et === 9;
};

/** Check if event is a laser rotation event.
 * ```ts
 * if (isLaserRotationEvent(event)) {}
 * ```
 */
export const isLaserRotationEvent = (
    event: BasicEvent
): event is BasicEventLaserRotation => {
    return event.et === 12 || event.et === 13;
};

/** Check if event is a lane rotation event.
 * ```ts
 * if (isLaneRotationEvent(event)) {}
 * ```
 */
export const isLaneRotationEvent = (
    event: BasicEvent
): event is BasicEventLaneRotation => {
    return event.et === 14 || event.et === 15;
};

/** Check if event is a extra event.
 * ```ts
 * if (isExtraEvent(event)) {}
 * ```
 */
export const isExtraEvent = (event: BasicEvent): event is BasicEventExtra => {
    return event.et === 16 || event.et === 17 || event.et === 18 || event.et === 19;
};

/** Check if event is a special event.
 * ```ts
 * if (isSpecialEvent(event)) {}
 * ```
 */
export const isSpecialEvent = (event: BasicEvent): event is BasicEventSpecial => {
    return event.et === 40 || event.et === 41 || event.et === 42 || event.et === 43;
};

/** Check if event is a BPM change event.
 * ```ts
 * if (isBPMChangeEvent(event)) {}
 * ```
 */
export const isBPMChangeEvent = (event: BasicEvent): event is BasicEventBPMChange => {
    return event.et === 100;
};

/** Not to be confused with isLightEvent, this checks for event that affects the environment/lighting.
 * ```ts
 * if (isLightingEvent(event)) {}
 * ```
 */
export const isLightingEvent = (event: BasicEvent): boolean => {
    return (
        isLightEvent(event) ||
        isRingEvent(event) ||
        isZoomEvent(event) ||
        isLaserRotationEvent(event) ||
        isExtraEvent(event)
    );
};

/** Check if event has old Chroma properties.
 * ```ts
 * if (hasOldChroma(event)) {}
 * ```
 */
export const hasOldChroma = (event: BasicEvent): boolean => {
    return event.i >= 2000000000;
};

/** Check if event is a valid, vanilla event.
 * ```ts
 * if (isValid(event)) {}
 * ```
 */
export const isValid = (event: BasicEvent): boolean => {
    return (
        isValidType(event) &&
        event.i >= 0 &&
        !(
            !isLaserRotationEvent(event) &&
            (event as BasicEvent).i > 8 &&
            !hasOldChroma(event)
        )
    );
};
