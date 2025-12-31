import type { Vector2 } from '../../types/vector.ts';
import type { NoteDirection } from '../schema/shared/types/constants.ts';

/** Also known as lane count. */
export const LINE_COUNT = 4;

/** Size of grid in unity unit */
export const LANE_SIZE = 0.6;

/** Size of regular note in unity unit */
export const NOTE_SIZE = [0.5, 0.5] as const;

/** Y-offset of note on grid in unity unit */
export const NoteYOffset = {
   0: 0,
   1: 0.05,
   2: 0.1,
};

/**
 * Cut angle corresponding to the `direction`.
 * ```ts
 * 0 (UP) -> 180
 * 1 (DOWN) -> 0
 * 2 (LEFT) -> 270
 * 3 (RIGHT) -> 90
 * 4 (UP_LEFT) -> 225
 * 5 (UP_RIGHT) -> 135
 * 6 (DOWN_LEFT) -> 315
 * 7 (DOWN_RIGHT) -> 45
 * 8 (ANY) -> 0
 * ```
 *
 * **NOTE:** Rotation in counter-clockwise.
 */
export const NoteDirectionAngle: { readonly [d in NoteDirection]: number } = {
   [0]: 180,
   [1]: 0,
   [2]: 270,
   [3]: 90,
   [4]: 225,
   [5]: 135,
   [6]: 315,
   [7]: 45,
   [8]: 0,
} as const;

/**
 * Opposite direction corresponding to the `direction`.
 * ```ts
 * 0 (UP) -> 1 (DOWN)
 * 1 (DOWN) -> 0 (UP)
 * 2 (LEFT) -> 3 (RIGHT)
 * 3 (RIGHT) -> 2 (LEFT)
 * 4 (UP_LEFT) -> 7 (DOWN_RIGHT)
 * 5 (UP_RIGHT) -> 6 (DOWN_LEFT)
 * 6 (DOWN_LEFT) -> 5 (UP_RIGHT)
 * 7 (DOWN_RIGHT) -> 4 (UP_LEFT)
 * 8 (ANY) -> 8 (ANY)
 * ```
 */
export const NoteDirectionFlip: { readonly [d in NoteDirection]: NoteDirection } = {
   [0]: 1,
   [1]: 0,
   [2]: 3,
   [3]: 2,
   [4]: 7,
   [5]: 6,
   [6]: 5,
   [7]: 4,
   [8]: 8,
} as const;

/**
 * Array index mapped to tuple of `posX` and `posY` corresponding to the `direction`.
 * ```ts
 * 0 (UP) -> [0, 1]
 * 1 (DOWN) -> [0, -1]
 * 2 (LEFT) -> [-1, 0]
 * 3 (RIGHT) -> [1, 0]
 * 4 (UP_LEFT) -> [-1, 1]
 * 5 (UP_RIGHT) -> [1, 1]
 * 6 (DOWN_LEFT) -> [-1, -1]
 * 7 (DOWN_RIGHT) -> [1, -1]
 * 8 (ANY) -> [0, 0]
 * ```
 */
export const NoteDirectionSpace: { readonly [d in NoteDirection]: Readonly<Vector2> } = {
   [0]: [0, 1],
   [1]: [0, -1],
   [2]: [-1, 0],
   [3]: [1, 0],
   [4]: [-1, 1],
   [5]: [1, 1],
   [6]: [-1, -1],
   [7]: [1, -1],
   [8]: [0, 0],
} as const;

/** Unused as of beatmap v3, useful for conversion reason. */
export const EventLaneRotationValue: { readonly [key: number]: number } = {
   0: -60,
   1: -45,
   2: -30,
   3: -15,
   4: 15,
   5: 30,
   6: 45,
   7: 60,
} as const;

/** Unused as of beatmap v3, useful for conversion reason. */
export const RotationValueEventValue: { readonly [key: number]: number } = {
   '-60': 0,
   '-45': 1,
   '-30': 2,
   '-15': 3,
   '15': 4,
   '30': 5,
   '45': 6,
   '60': 7,
} as const;
