import { IBaseObject, BaseObject } from './baseObject.ts';
import { CustomData } from './customData.ts';

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

interface IBasicEventBase extends IBaseObject {
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
    cd?: CustomData;
}

interface IBasicEventGeneric extends IBasicEventBase {
    et: number;
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
    et: 8 | 9;
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
    | IBasicEventGeneric
    | IBasicEventLight
    | IBasicEventBoost
    | IBasicEventRing
    | IBasicEventLaserRotation
    | IBasicEventLaneRotation
    | IBasicEventExtra
    | IBasicEventSpecial
    | IBasicEventBPMChange;

const defaultValue: Required<IBasicEvent> = {
    b: 0,
    et: 0,
    i: 0,
    f: 1,
    cd: () => {},
};

/** Basic event beatmap object. */
export class BasicEvent extends BaseObject<IBasicEvent> {
    private et;
    private i;
    private f;
    private cdata;
    constructor(basicEvent: Required<IBasicEvent>) {
        super(basicEvent);
        this.et = basicEvent.et;
        this.i = basicEvent.i;
        this.f = basicEvent.f;
        this.cdata = basicEvent.cd;
    }

    static create(): BasicEvent;
    static create(basicEvents: Partial<IBasicEvent>): BasicEvent;
    static create(...basicEvents: Partial<IBasicEvent>[]): BasicEvent[];
    static create(...basicEvents: Partial<IBasicEvent>[]): BasicEvent | BasicEvent[] {
        const result: BasicEvent[] = [];
        basicEvents?.forEach((be) =>
            result.push(
                new BasicEvent({
                    b: be.b ?? defaultValue.b,
                    et: be.et ?? defaultValue.et,
                    i: be.i ?? defaultValue.i,
                    f: be.f ?? defaultValue.f,
                    cd: be.cd ?? defaultValue.cd,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new BasicEvent({
            b: defaultValue.b,
            et: defaultValue.et,
            i: defaultValue.i,
            f: defaultValue.f,
            cd: defaultValue.cd,
        });
    }

    toObject(): IBasicEvent {
        return {
            b: this.time,
            et: this.et,
            i: this.value,
            f: this.floatValue,
            cd: this.cdata,
        };
    }

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
    get type() {
        return this.et;
    }
    set type(value: IBasicEvent['et']) {
        this.et = value;
    }

    /** Value `<int>` of basic event. */
    get value() {
        return this.i;
    }
    set value(value: IBasicEvent['i']) {
        this.i = value;
    }

    /** Float value `<float>` of basic event. */
    get floatValue() {
        return this.f;
    }
    set floatValue(value: IBasicEvent['f']) {
        this.f = value;
    }

    setType(value: IBasicEvent['et']) {
        this.type = value;
        return this;
    }
    setValue(value: IBasicEvent['i']) {
        this.value = value;
        return this;
    }
    setFloatValue(value: IBasicEvent['f']) {
        this.floatValue = value;
        return this;
    }

    /** Check if light event is an off event.
     * ```ts
     * if (basicEvent.isOff()) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    isOff() {
        return this.value === 0;
    }

    /** Check if light event is an on event.
     * ```ts
     * if (basicEvent.isOn()) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    isOn() {
        return this.value === 1 || this.value === 5;
    }

    /** Check if light event is a flash event.
     * ```ts
     * if (basicEvent.isFlash()) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    isFlash() {
        return this.value === 2 || this.value === 6;
    }

    /** Check if light event is a fade event.
     * ```ts
     * if (basicEvent.isFade()) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    isFade() {
        return this.value === 3 || this.value === 7;
    }

    /** Check if light event is a transition event.
     * ```ts
     * if (basicEvent.isTransition()) {}
     * ```
     * ---
     * This may check non-light event too.
     */
    isTransition() {
        return this.value === 4 || this.value === 8;
    }

    /** Check if event is a valid type.
     * ```ts
     * if (basicEvent.isValidType()) {}
     * ```
     */
    isValidType() {
        return (this.type >= 0 && this.type <= 17) || this.type === 100;
    }

    /** Check if event is a light event.
     * ```ts
     * if (basicEvent.isLightEvent()) {}
     * ```
     */
    isLightEvent(): this is IBasicEventLight {
        return (
            this.type === 0 ||
            this.type === 1 ||
            this.type === 2 ||
            this.type === 3 ||
            this.type === 4 ||
            this.type === 6 ||
            this.type === 7 ||
            this.type === 10 ||
            this.type === 11
        );
    }

    /** Check if event is a boost event.
     * ```ts
     * if (basicEvent.isColorBoost()) {}
     * ```
     */
    isColorBoost(): this is IBasicEventBoost {
        return this.type === 5;
    }

    /** Check if event is a ring event.
     * ```ts
     * if (basicEvent.isRingEvent()) {}
     * ```
     * ---
     * This does not check for ring zoom.
     */
    isRingEvent() {
        return this.type === 8;
    }

    /** Check if event is a ring zoom event.
     * ```ts
     * if (basicEvent.isZoomEvent()) {}
     * ```
     */
    isZoomEvent() {
        return this.type === 9;
    }

    /** Check if event is a laser rotation event.
     * ```ts
     * if (basicEvent.isLaserRotationEvent()) {}
     * ```
     */
    isLaserRotationEvent(): this is IBasicEventLaserRotation {
        return this.type === 12 || this.type === 13;
    }

    /** Check if event is a lane rotation event.
     * ```ts
     * if (basicEvent.isLaneRotationEvent()) {}
     * ```
     */
    isLaneRotationEvent(): this is IBasicEventLaneRotation {
        return this.type === 14 || this.type === 15;
    }

    /** Check if event is a extra event.
     * ```ts
     * if (basicEvent.isExtraEvent()) {}
     * ```
     */
    isExtraEvent(): this is IBasicEventExtra {
        return (
            this.type === 16 || this.type === 17 || this.type === 18 || this.type === 19
        );
    }

    /** Check if event is a special event.
     * ```ts
     * if (basicEvent.isSpecialEvent()) {}
     * ```
     */
    isSpecialEvent(): this is IBasicEventSpecial {
        return (
            this.type === 40 || this.type === 41 || this.type === 42 || this.type === 43
        );
    }

    /** Check if event is a BPM change event.
     * ```ts
     * if (basicEvent.isBPMChangeEvent()) {}
     * ```
     */
    isBPMChangeEvent(): this is IBasicEventBPMChange {
        return this.type === 100;
    }

    /** Not to be confused with isLightEvent, this checks for event that affects the environment/lighting.
     * ```ts
     * if (basicEvent.isLightingEvent()) {}
     * ```
     */
    isLightingEvent() {
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
     * if (basicEvent.hasOldChroma()) {}
     * ```
     */
    hasOldChroma() {
        return this.value >= 2000000000;
    }

    /** Check if event is a valid, vanilla event.
     * ```ts
     * if (basicEvent.isValid()) {}
     * ```
     */
    isValid() {
        return (
            this.isValidType() &&
            this.value >= 0 &&
            !(!this.isLaserRotationEvent() && this.value > 8 && !this.hasOldChroma())
        );
    }
}
