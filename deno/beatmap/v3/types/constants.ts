/** Also known as lane count. */
export const LINE_COUNT = 4;

export enum NoteCutDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UP_LEFT,
    UP_RIGHT,
    DOWN_LEFT,
    DOWN_RIGHT,
    ANY,
}

export enum EaseType {
    NONE = -1,
    LINEAR,
    IN_QUAD,
    OUT_QUAD,
    INOUT_QUAD,
}

/** Used for lane rotation event. */
export enum ExecutionTime {
    EARLY,
    LATE,
}

export enum TransitionType {
    INSTANT,
    INTERPOLATE,
    EXTEND,
}

/** Used for light rotation event. */
export enum Axis {
    X,
    Y,
}

export enum LightRotationDirection {
    AUTOMATIC,
    CLOCKWISE,
    COUNTER_CLOCKWISE,
}

export enum SliderMidAnchorMode {
    STRAIGHT,
    CLOCKWISE,
    COUNTER_CLOCKWISE,
}
