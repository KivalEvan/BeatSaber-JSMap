/** Base game note color value. */
export const enum NoteColor {
   NONE = -1,
   RED,
   BLUE,
}

/** Base game note direction value. */
export const enum NoteDirection {
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

/** Base game object position X value. */
export const enum PosX {
   LEFT,
   MIDDLE_LEFT,
   MIDDLE_RIGHT,
   RIGHT,
}

/** Base game object position Y value. */
export const enum PosY {
   BOTTOM,
   MIDDLE,
   TOP,
}

/** Base game event light value used in basic event. */
export const enum EventLightValue {
   OFF,
   BLUE_ON,
   BLUE_FLASH,
   BLUE_FADE,
   BLUE_TRANSITION,
   RED_ON,
   RED_FLASH,
   RED_FADE,
   RED_TRANSITION,
   WHITE_ON,
   WHITE_FLASH,
   WHITE_FADE,
   WHITE_TRANSITION,
}

/** Generic event type value used in basic event. */
export const enum EventType {
   BACK_LASERS,
   RING_LIGHTS,
   LEFT_LASERS,
   RIGHT_LASERS,
   CENTER_LIGHTS,
   COLOR_BOOST,
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
   NJS_CHANGE = 1000,
}

/** Base game index filter type value. */
export const enum IndexFilterType {
   DIVISION = 1,
   STEP_AND_OFFSET,
}

/** Base game limit also affects type value used in index filter. */
export const enum LimitAlsoAffectsType {
   NONE,
   DURATION,
   DISTRIBUTION,
   ALL,
}

/** Base game random type value used in index filter. */
export const enum RandomType {
   NO_RANDOM,
   KEEP_ORDER,
   RANDOM_ELEMENTS,
   ALL,
}

/** Base game event color value used in light color event. */
export const enum EventLightColor {
   NONE = -1,
   RED,
   BLUE,
   WHITE,
}

/** Base game distribution type value used in light event. */
export const enum DistributionType {
   WAVE = 1,
   STEP,
}

/** Base game ease type value used in light event. */
export const enum EaseType {
   NONE = -1,
   LINEAR,
   IN_QUAD,
   OUT_QUAD,
   INOUT_QUAD,
   IN_SINE,
   OUT_SINE,
   INOUT_SINE,
   IN_CUBIC,
   OUT_CUBIC,
   INOUT_CUBIC,
   IN_QUART,
   OUT_QUART,
   INOUT_QUART,
   IN_QUINT,
   OUT_QUINT,
   INOUT_QUINT,
   IN_EXPO,
   OUT_EXPO,
   INOUT_EXPO,
   IN_CIRC,
   OUT_CIRC,
   INOUT_CIRC,
   IN_BACK,
   OUT_BACK,
   INOUT_BACK,
   IN_ELASTIC,
   OUT_ELASTIC,
   INOUT_ELASTIC,
   IN_BOUNCE,
   OUT_BOUNCE,
   INOUT_BOUNCE,
   BS_INOUT_BACK = 100,
   BS_INOUT_ELASTIC,
   BS_INOUT_BOUNCE,
}

/** Base game execution time value used in rotation event. */
export const enum ExecutionTime {
   EARLY,
   LATE,
}

/** Base game transition type value used in light color event. */
export const enum TransitionType {
   INSTANT,
   INTERPOLATE,
   EXTEND,
}

/** Base game axis value used in rotation/translation event box. */
export const enum Axis {
   X,
   Y,
   Z,
}

/** Base game FX type value used in FX event group. */
export const enum FxType {
   INT,
   FLOAT,
   BOOL,
}

/** Base game light rotation direction value used in light rotation event. */
export const enum LightRotationDirection {
   AUTOMATIC,
   CLOCKWISE,
   COUNTER_CLOCKWISE,
}

/** Base game slider mid anchor mode value used in arc. */
export const enum SliderMidAnchorMode {
   STRAIGHT,
   CLOCKWISE,
   COUNTER_CLOCKWISE,
}

/** Base game event box type value. */
export const enum EventBoxType {
   NONE,
   COLOR,
   ROTATION,
   TRANSLATION,
   FX_FLOAT,
}
