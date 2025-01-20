import type { Member } from '../../utils.ts';

/** Base game object position X value. */
export const PosX = {
   LEFT: 0,
   MIDDLE_LEFT: 1,
   MIDDLE_RIGHT: 2,
   RIGHT: 3,
} as const;
export type PosX = Member<typeof PosX>;

/** Base game object position Y value. */
export const PosY = {
   BOTTOM: 0,
   MIDDLE: 1,
   TOP: 2,
} as const;
export type PosY = Member<typeof PosY>;

/** Base game note color value. */
export const NoteColor = {
   NONE: -1,
   RED: 0,
   BLUE: 1,
} as const;
export type NoteColor = Member<typeof NoteColor>;

/** Base game note direction value. */
export const NoteDirection = {
   UP: 0,
   DOWN: 1,
   LEFT: 2,
   RIGHT: 3,
   UP_LEFT: 4,
   UP_RIGHT: 5,
   DOWN_LEFT: 6,
   DOWN_RIGHT: 7,
   ANY: 8,
} as const;
export type NoteDirection = Member<typeof NoteDirection>;

/** Base game waypoint offset direction value. */
export const OffsetDirection = {
   UP: 0,
   DOWN: 1,
   LEFT: 2,
   RIGHT: 3,
   UP_LEFT: 4,
   UP_RIGHT: 5,
   DOWN_LEFT: 6,
   DOWN_RIGHT: 7,
   NONE: 9,
} as const;
export type OffsetDirection = Member<typeof OffsetDirection>;

/** Base game slider mid anchor mode value used in arc. */
export const SliderMidAnchorMode = {
   STRAIGHT: 0,
   CLOCKWISE: 1,
   COUNTER_CLOCKWISE: 2,
} as const;
export type SliderMidAnchorMode = Member<typeof SliderMidAnchorMode>;

/** Base game event light value used in basic event. */
export const EventLightValue = {
   OFF: 0,
   BLUE_ON: 1,
   BLUE_FLASH: 2,
   BLUE_FADE: 3,
   BLUE_TRANSITION: 4,
   RED_ON: 5,
   RED_FLASH: 6,
   RED_FADE: 7,
   RED_TRANSITION: 8,
   WHITE_ON: 9,
   WHITE_FLASH: 10,
   WHITE_FADE: 11,
   WHITE_TRANSITION: 12,
} as const;
export type EventLightValue = Member<typeof EventLightValue>;

/** Generic event type value used in basic event. */
export const EventType = {
   BACK_LASERS: 0,
   RING_LIGHTS: 1,
   LEFT_LASERS: 2,
   RIGHT_LASERS: 3,
   CENTER_LIGHTS: 4,
   COLOR_BOOST: 5,
   EXTRA_LEFT_LIGHTS: 6,
   EXTRA_RIGHT_LIGHTS: 7,
   RING_ROTATION: 8,
   RING_ZOOM: 9,
   EXTRA_LEFT_LASERS: 10,
   EXTRA_RIGHT_LASERS: 11,
   LEFT_LASER_ROTATION: 12,
   RIGHT_LASER_ROTATION: 13,
   EARLY_LANE_ROTATION: 14,
   LATE_LANE_ROTATION: 15,
   UTILITY_EVENT_0: 16,
   UTILITY_EVENT_1: 17,
   UTILITY_EVENT_2: 18,
   UTILITY_EVENT_3: 19,
   SPECIAL_EVENT_0: 40,
   SPECIAL_EVENT_1: 41,
   SPECIAL_EVENT_2: 42,
   SPECIAL_EVENT_3: 43,
   BPM_CHANGE: 100,
   NJS_CHANGE: 1000,
} as const;
export type EventType = Member<typeof EventType>;

/** Base game execution time value used in spawn rotation event. */
export const ExecutionTime = {
   EARLY: 0,
   LATE: 1,
} as const;
export type ExecutionTime = Member<typeof ExecutionTime>;

/** Base game index filter type value. */
export const IndexFilterType = {
   DIVISION: 1,
   STEP_AND_OFFSET: 2,
} as const;
export type IndexFilterType = Member<typeof IndexFilterType>;

/** Base game limit also affects type value used in index filter. */
export const LimitAlsoAffectsType = {
   NONE: 0,
   DURATION: 1,
   DISTRIBUTION: 2,
   ALL: 3,
} as const;
export type LimitAlsoAffectsType = Member<typeof LimitAlsoAffectsType>;

/** Base game random type value used in index filter. */
export const RandomType = {
   NO_RANDOM: 0,
   KEEP_ORDER: 1,
   RANDOM_ELEMENTS: 2,
   ALL: 3,
} as const;
export type RandomType = Member<typeof RandomType>;

/** Base game distribution type value used in light event. */
export const DistributionType = {
   WAVE: 1,
   STEP: 2,
} as const;
export type DistributionType = Member<typeof DistributionType>;

/** Base game ease type value used in light event. */
export const EaseType = {
   NONE: -1,
   LINEAR: 0,
   IN_QUAD: 1,
   OUT_QUAD: 2,
   INOUT_QUAD: 3,
   IN_SINE: 4,
   OUT_SINE: 5,
   INOUT_SINE: 6,
   IN_CUBIC: 7,
   OUT_CUBIC: 8,
   INOUT_CUBIC: 9,
   IN_QUART: 10,
   OUT_QUART: 11,
   INOUT_QUART: 12,
   IN_QUINT: 13,
   OUT_QUINT: 14,
   INOUT_QUINT: 15,
   IN_EXPO: 16,
   OUT_EXPO: 17,
   INOUT_EXPO: 18,
   IN_CIRC: 19,
   OUT_CIRC: 20,
   INOUT_CIRC: 21,
   IN_BACK: 22,
   OUT_BACK: 23,
   INOUT_BACK: 24,
   IN_ELASTIC: 25,
   OUT_ELASTIC: 26,
   INOUT_ELASTIC: 27,
   IN_BOUNCE: 28,
   OUT_BOUNCE: 29,
   INOUT_BOUNCE: 30,
   BS_INOUT_BACK: 100,
   BS_INOUT_ELASTIC: 101,
   BS_INOUT_BOUNCE: 102,
} as const;
export type EaseType = Member<typeof EaseType>;

/** Base game event color value used in light color event. */
export const EventLightColor = {
   NONE: -1,
   RED: 0,
   BLUE: 1,
   WHITE: 2,
} as const;
export type EventLightColor = Member<typeof EventLightColor>;

/** Base game axis value used in rotation/translation event box. */
export const Axis = {
   X: 0,
   Y: 1,
   Z: 2,
} as const;
export type Axis = Member<typeof Axis>;

/** Base game light rotation direction value used in light rotation event. */
export const LightRotationDirection = {
   AUTOMATIC: 0,
   CLOCKWISE: 1,
   COUNTER_CLOCKWISE: 2,
} as const;
export type LightRotationDirection = Member<typeof LightRotationDirection>;

/** Base game note type value used in v1/v2 note. */
export const NoteType = {
   NOTE_A: 0,
   NOTE_B: 1,
   BOMB: 3,
} as const;
export type NoteType = Member<typeof NoteType>;

/** Base game obstacle type value used in v1/v2 obstacle. */
export const ObstacleType = {
   FULL_HEIGHT: 0,
   TOP: 1,
   FREE: 2,
} as const;
export type ObstacleType = Member<typeof ObstacleType>;

/** Base game transition type value used in v3 light color event. */
export const TransitionType = {
   INSTANT: 0,
   INTERPOLATE: 1,
   EXTEND: 2,
} as const;
export type TransitionType = Member<typeof TransitionType>;

/** Base game FX type value used in v3 FX event group. */
export const FxType = {
   INT: 0,
   FLOAT: 1,
   BOOL: 2,
} as const;
export type FxType = Member<typeof FxType>;

/** Base game event box type value used in v4 event box group. */
export const EventBoxType = {
   NONE: 0,
   COLOR: 1,
   ROTATION: 2,
   TRANSLATION: 3,
   FX_FLOAT: 4,
} as const;
export type EventBoxType = Member<typeof EventBoxType>;
