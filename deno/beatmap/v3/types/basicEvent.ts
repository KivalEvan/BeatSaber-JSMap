import { IBaseObject, BaseObject } from './baseObject.ts';

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
interface IBasicEventBase extends IBaseObject {
    /** Event type `<int>` of basic this.
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
    /** Value `<int>` of basic this. */
    i: number;
    /** Float value `<float>` of basic this. */
    f: number;
}

interface IBasicEventLight extends IBasicEventBase {
    et: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 10 | 11;
    /** State of light this. ( Blue | Red )
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

/** **Deprecated:** use `colorBoostBeatmapEvents` to apply boost this. */
interface IBasicEventBoost extends IBasicEventBase {
    et: 5;
    /** **Deprecated:** use `colorBoostBeatmapEvents` to apply boost this.
     *
     * Toggle between boost this. */
    i: 0 | 1;
}

interface IBasicEventRing extends IBasicEventBase {
    et: 8;
}

interface IBasicEventZoom extends IBasicEventBase {
    et: 9;
}

interface IBasicEventLaserRotation extends IBasicEventBase {
    et: 12 | 13;
    /** Laser rotation speed in degree per second multiplied by 20. */
    i: number;
}

/** **Deprecated:** use `rotationEvents` to apply lane rotation this. */
interface IBasicEventLaneRotation extends IBasicEventBase {
    et: 14 | 15;
    /** **Deprecated:** use `rotationEvents` to apply lane rotation this.
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

interface IBasicEventExtra extends IBasicEventBase {
    et: 16 | 17 | 18 | 19;
}

/** but why? */
interface IBasicEventSpecial extends IBasicEventBase {
    et: 40 | 41 | 42 | 43;
}

/** **Deprecated:** use `bpmEvents` to apply BPM change. */
interface IBasicEventBPMChange extends IBasicEventBase {
    et: 100;
    /** **Deprecated:** use `bpmEvents` to apply BPM change.
     *
     * Changes the BPM to this value. */
    f: number;
}

export type IBasicEvent =
    | IBasicEventLight
    | IBasicEventBoost
    | IBasicEventRing
    | IBasicEventZoom
    | IBasicEventLaserRotation
    | IBasicEventLaneRotation
    | IBasicEventExtra
    | IBasicEventSpecial
    | IBasicEventBPMChange;

export class BasicEvent extends BaseObject<IBasicEvent> {
    private et;
    private i;
    private f;
    constructor(basicEvent: IBasicEvent) {
        super(basicEvent);
        this.et = basicEvent.et;
        this.i = basicEvent.i;
        this.f = basicEvent.f;
    }

    public toObject(): IBasicEvent {
        return {
            b: this.time,
            et: (this as unknown as IBasicEventRing).et, // i dont care, shut up
            i: this.value,
            f: this.floatValue,
        };
    }

    get type() {
        return this.et;
    }
    set type(value: IBasicEvent['et']) {
        this.et = value;
    }

    get value() {
        return this.i;
    }
    set value(value: IBasicEvent['i']) {
        this.i = value;
    }

    get floatValue() {
        return this.f;
    }
    set floatValue(value: IBasicEvent['f']) {
        this.f = value;
    }

    /** Check if lightthis is Ian off this.
     * ```ts
     * if (isOff(event)) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    public isOff() {
        return this.i === 0;
    }

    /** Check if lightthis is Ian on this.
     * ```ts
     * if (isOn(event)) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    public isOn() {
        return this.i === 1 || this.i === 5;
    }

    /** Check if lightthis is Ia flash this.
     * ```ts
     * if (isFlash(event)) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    public isFlash() {
        return this.i === 2 || this.i === 6;
    }

    /** Check if lightthis is Ia fade this.
     * ```ts
     * if (isFade(event)) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    public isFade() {
        return this.i === 3 || this.i === 7;
    }

    /** Check if lightthis is Ia transition this.
     * ```ts
     * if (isTransition(event)) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    public isTransition() {
        return this.i === 4 || this.i === 8;
    }

    /** Check ifthis is Ia valid type.
     * ```ts
     * if (isValidType(event)) {}
     * ```
     */
    public isValidType() {
        return (this.et >= 0 && this.et <= 17) || this.et === 100;
    }

    /** Check ifthis is Ia light this.
     * ```ts
     * if (isLightEvent(event)) {}
     * ```
     */
    public isLightEvent(): this is IBasicEventLight {
        return (
            this.et === 0 ||
            this.et === 1 ||
            this.et === 2 ||
            this.et === 3 ||
            this.et === 4 ||
            this.et === 6 ||
            this.et === 7 ||
            this.et === 10 ||
            this.et === 11
        );
    }

    /** Check ifthis is Ia boost this.
     * ```ts
     * if (isColorBoost(event)) {}
     * ```
     */
    public isColorBoost(): this is IBasicEventBoost {
        return this.et === 5;
    }

    /** Check ifthis is Ia ring this.
     * ```ts
     * if (isRingEvent(event)) {}
     * ```
     * ---
     * This does not check for ring zoom.
     */
    public isRingEvent(): this is IBasicEventRing {
        return this.et === 8;
    }

    /** Check ifthis is Ia ring zoom this.
     * ```ts
     * if (isZoomEvent(event)) {}
     * ```
     */
    public isZoomEvent(): this is IBasicEventZoom {
        return this.et === 9;
    }

    /** Check ifthis is Ia laser rotation this.
     * ```ts
     * if (isLaserRotationEvent(event)) {}
     * ```
     */
    public isLaserRotationEvent(): this is IBasicEventLaserRotation {
        return this.et === 12 || this.et === 13;
    }

    /** Check ifthis is Ia lane rotation this.
     * ```ts
     * if (isLaneRotationEvent(event)) {}
     * ```
     */
    public isLaneRotationEvent(): this is IBasicEventLaneRotation {
        return this.et === 14 || this.et === 15;
    }

    /** Check ifthis is Ia extra this.
     * ```ts
     * if (isExtraEvent(event)) {}
     * ```
     */
    public isExtraEvent(): this is IBasicEventExtra {
        return this.et === 16 || this.et === 17 || this.et === 18 || this.et === 19;
    }

    /** Check ifthis is Ia special this.
     * ```ts
     * if (isSpecialEvent(event)) {}
     * ```
     */
    public isSpecialEvent(): this is IBasicEventSpecial {
        return this.et === 40 || this.et === 41 || this.et === 42 || this.et === 43;
    }

    /** Check ifthis is Ia BPM change this.
     * ```ts
     * if (isBPMChangeEvent(event)) {}
     * ```
     */
    public isBPMChangeEvent(): this is IBasicEventBPMChange {
        return this.et === 100;
    }

    /** Not to be confused with isLightEvent, this checks for event that affects the environment/lighting.
     * ```ts
     * if (isLightingEvent(event)) {}
     * ```
     */
    public isLightingEvent() {
        return (
            this.isLightEvent() ||
            this.isRingEvent() ||
            this.isZoomEvent() ||
            this.isLaserRotationEvent() ||
            this.isExtraEvent()
        );
    }

    /** Check if event has old Chroma properties.
     * ```ts
     * if (hasOldChroma(event)) {}
     * ```
     */
    public hasOldChroma() {
        return this.i >= 2000000000;
    }

    /** Check ifthis is Ia valid, vanilla this.
     * ```ts
     * if (isValid(event)) {}
     * ```
     */
    public isValid() {
        return (
            this.isValidType() &&
            this.i >= 0 &&
            !(!this.isLaserRotationEvent() && this.i > 8 && !this.hasOldChroma())
        );
    }
}
