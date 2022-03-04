import { BaseObject } from './baseObject.ts';

export enum BasicEventLightValue {
    OFF,
    BLUE_ON,
    BLUE_FLASH,
    BLUE_FADE,
    BLUE_TRANSITION,
    RED_ON,
    RED_FLASH,
    RED_FADE,
    RED_TRANSITION,
}

export enum BasicEventType {
    BACK_LASERS,
    RING_LIGHTS,
    LEFT_LASERS,
    RIGHT_LASERS,
    CENTER_LIGHTS,
    LIGHT_BOOST,
    EXTRA_LEFT_LIGHTS,
    EXTRA_RIGHT_LIGHTS,
    RING_ROTATION,
    RING_ZOOM,
    EXTRA_LEFT_LASERS,
    EXTRA_RIGHT_LASERS,
    LEFT_LASER_ROTATION,
    RIGHT_LASER_ROTATION,
    EARLY_LANE_ROTATION,
    LATE_LANE_ROTATION,
    UTILITY_EVENT_0,
    UTILITY_EVENT_1,
    UTILITY_EVENT_2,
    UTILITY_EVENT_3,
    SPECIAL_EVENT_0 = 40,
    SPECIAL_EVENT_1 = 41,
    SPECIAL_EVENT_2 = 42,
    SPECIAL_EVENT_3 = 43,
    BPM_CHANGE = 100,
}

/** Basic event beatmap object. */
export interface BasicEventBase extends BaseObject {
    /** Event type `<int>` of basic event.
     * ```ts
     * 0 -> Back Lasers
     * 1 -> Ring Lights
     * 2 -> Left Lasers
     * 3 -> Right Lasers
     * 4 -> Center Lights
     * 5 -> Light Boost
     * 6 -> Extra Left Lights
     * 7 -> Extra Right Lights
     * 8 -> Ring Rotation
     * 9 -> Ring Zoom
     * 10 -> Extra Left Lasers
     * 11 -> Extra Right Lasers
     * 12 -> Left Laser Rotation
     * 13 -> Right Laser Rotation
     * 14 -> Early Lane Rotation
     * 15 -> Late Lane Rotation
     * 16 -> Utility Event 0
     * 17 -> Utility Event 1
     * 18 -> Utility Event 2
     * 19 -> Utility Event 3
     * 40 -> Special Event 0
     * 41 -> Special Event 1
     * 42 -> Special Event 2
     * 43 -> Special Event 3
     * 100 -> BPM Change
     * ```
     */
    et: number;
    /** Value `<int>` of basic event. */
    i: number;
    /** Float value `<float>` of basic event. */
    f: number;
}

export interface BasicEventLight extends BasicEventBase {
    et: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 10 | 11;
    /** State of light event. ( Blue | Red )
     * ```ts
     * 0 -> Off
     * 1 | 5 -> On
     * 2 | 6 -> Flash
     * 3 | 7 -> Fade
     * 4 | 8 -> Transition
     * ```
     */
    i: number;
    /** Controls the brightness of the light.
     *
     * Range: `0-1` (0% to 100%), can be more than 1.
     */
    f: number;
}

/** **Deprecated:** use `colorBoostBeatmapEvents` to apply boost event. */
export interface BasicEventBoost extends BasicEventBase {
    et: 5;
    /** **Deprecated:** use `colorBoostBeatmapEvents` to apply boost event.
     *
     * Toggle between boost event. */
    i: 0 | 1;
}

export interface BasicEventRing extends BasicEventBase {
    et: 8;
}

export interface BasicEventZoom extends BasicEventBase {
    et: 9;
}

export interface BasicEventLaserRotation extends BasicEventBase {
    et: 12 | 13;
    /** Laser rotation speed in degree per second multiplied by 20. */
    i: number;
}

/** **Deprecated:** use `rotationEvents` to apply lane rotation event. */
export interface BasicEventLaneRotation extends BasicEventBase {
    et: 14 | 15;
    /** **Deprecated:** use `rotationEvents` to apply lane rotation event.
     *
     * Amount of angle changed clockwise.
     * ```ts
     * 0 -> -60 Degree
     * 1 -> -45 Degree
     * 2 -> -30 Degree
     * 3 -> -15 Degree
     * 4 -> 15 Degree
     * 5 -> 30 Degree
     * 6 -> 45 Degree
     * 7 -> 60 Degree
     * ```
     */
    i: number;
}

export interface BasicEventExtra extends BasicEventBase {
    et: 16 | 17 | 18 | 19;
}

/** but why? */
export interface BasicEventSpecial extends BasicEventBase {
    et: 40 | 41 | 42 | 43;
}

/** **Deprecated:** use `bpmEvents` to apply BPM change. */
export interface BasicEventBPMChange extends BasicEventBase {
    et: 100;
    /** **Deprecated:** use `bpmEvents` to apply BPM change.
     *
     * Changes the BPM to this value. */
    f: number;
}

export type BasicEvent =
    | BasicEventLight
    | BasicEventBoost
    | BasicEventRing
    | BasicEventZoom
    | BasicEventLaserRotation
    | BasicEventLaneRotation
    | BasicEventExtra
    | BasicEventSpecial
    | BasicEventBPMChange;
