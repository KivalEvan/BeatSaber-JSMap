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

/** Array index mapped to cut angle corresponding to the `_cutDirection`.
 * ```ts
 * 0 -> 180,
 * 1 -> 0,
 * 2 -> 270,
 * 3 -> 90,
 * 4 -> 225,
 * 5 -> 135,
 * 6 -> 315,
 * 7 -> 45,
 * 8 -> 0
 * ```
 */
export const NoteCutAngle: Readonly<Record<NoteCutDirection, number>> = {
    0: 180,
    1: 0,
    2: 270,
    3: 90,
    4: 225,
    5: 135,
    6: 315,
    7: 45,
    8: 0,
};

export const NoteFlipDirection: Readonly<Record<NoteCutDirection, NoteCutDirection>> = {
    0: 1,
    1: 0,
    2: 3,
    3: 2,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 8,
};

/** Array index mapped to tuple of `_lineIndex` and `_lineLayer` corresponding to the `_cutDirection`.
 * ```ts
 * 0 -> [0, 1],
 * 1 -> [0, -1],
 * 2 -> [-1, 0],
 * 3 -> [1, 0],
 * 4 -> [-1, 1],
 * 5 -> [1, 1],
 * 6 -> [-1, -1],
 * 7 -> [1, -1],
 * 8 -> [0, 0]
 * ```
 */
export const NoteCutDirectionSpace: Readonly<
    Record<NoteCutDirection, [number, number]>
> = {
    0: [0, 1],
    1: [0, -1],
    2: [-1, 0],
    3: [1, 0],
    4: [-1, 1],
    5: [1, 1],
    6: [-1, -1],
    7: [1, -1],
    8: [0, 0],
};

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
