import { resolveNoteAngle } from '../../beatmap/helpers/core/baseNote.ts';
import {
   isHorizontal,
   isVertical,
   resolveGridPosition,
} from '../../beatmap/helpers/core/gridObject.ts';
import { NoteDirection } from '../../beatmap/schema/shared/types/constants.ts';
import type { GetAngleFn } from '../../beatmap/schema/shared/types/functions.ts';
import type { IWrapBaseNote } from '../../beatmap/schema/wrapper/types/baseNote.ts';
import type { IWrapColorNote } from '../../beatmap/schema/wrapper/types/colorNote.ts';
import type { IWrapGridObject } from '../../beatmap/schema/wrapper/types/gridObject.ts';
import type { GetPositionFn } from '../../beatmap/schema/shared/types/functions.ts';
import type { Vector2 } from '../../types/vector.ts';
import { lowestDifferenceMod, mod } from '../../utils/math/helpers.ts';
import { radToDeg } from '../../utils/math/trigonometry.ts';

function angleInRange(alpha: number, lower: number, upper: number): boolean {
   return mod(alpha - lower, 360) <= mod(upper - lower, 360);
}

function getAngle(from: Vector2, to: Vector2): number {
   return radToDeg(Math.atan2(to[1] - from[1], to[0] - from[0]));
}

/** Check if current note can be swung into from previous note. */
export function isEndNote<
   T extends Pick<IWrapBaseNote, 'posX' | 'posY' | 'direction'>,
>(
   endNote: T,
   startNote: T,
   maybeDirection: number,
   angleTolerance = 85, // arbitrary angle, we don't take anything that are perpendicular
): boolean {
   const endPos = resolveGridPosition(endNote);
   const startPos = resolveGridPosition(startNote);
   const angleFromStart = getAngle(startPos, endPos);
   const angleFromEnd = getAngle(endPos, startPos);

   if (startNote.direction === NoteDirection.ANY) {
      const dirAngle = mod(resolveNoteAngle(endNote.direction) + 180, 360);
      return angleInRange(
         angleFromEnd,
         dirAngle - angleTolerance,
         dirAngle + angleTolerance,
      );
   }

   if (maybeDirection !== NoteDirection.ANY) {
      const dirAngle = resolveNoteAngle(maybeDirection);
      return (
         angleInRange(
            angleFromStart,
            dirAngle - angleTolerance,
            dirAngle + angleTolerance,
         ) ||
         angleInRange(
            angleFromEnd,
            dirAngle - angleTolerance,
            dirAngle + angleTolerance,
         )
      );
   }

   const dirAngle = resolveNoteAngle(startNote.direction);
   return angleInRange(
      angleFromStart,
      dirAngle - angleTolerance,
      dirAngle + angleTolerance,
   );
}

export function isNotePointing(
   note: Pick<IWrapColorNote, 'posX' | 'posY' | 'direction' | 'customData'> & {
      angleOffset?: number;
   },
   target: Pick<IWrapColorNote, 'posX' | 'posY' | 'customData'> & {
      angleOffset?: number;
   },
   angleTolerance: number,
   getPosition: GetPositionFn<
      Pick<IWrapGridObject, 'posX' | 'posY' | 'customData'>
   > = (object) => resolveGridPosition(object),
   getAngle: GetAngleFn<
      Pick<IWrapColorNote, 'direction' | 'customData'> & {
         angleOffset?: number;
      }
   > = (object) => resolveNoteAngle(object.direction) + (object.angleOffset || 0),
): boolean {
   const [pX, pY] = getPosition(note) ?? [note.posX, note.posY];
   const [qX, qY] = getPosition(target) ?? [target.posX, target.posY];
   const pA = getAngle(note) ?? 0;
   const pqA = (Math.atan2(qY - pY, qX - pX) * 180) / Math.PI + 90;
   return lowestDifferenceMod(pA, pqA, 360) <= angleTolerance;
}

/**
 * Check if the note intersect on swing path by angle and distance.
 *
 * Can be used to check for hitbox collision or handclap.
 *
 * ```ts
 * if (isIntersect(note1, note2, [[20, 1.5]])) {}
 * ```
 */
export function isNoteSwingable(
   noteA: Pick<IWrapColorNote, 'posX' | 'posY' | 'direction' | 'customData'> & {
      angleOffset?: number;
   },
   noteB: Pick<IWrapColorNote, 'posX' | 'posY' | 'direction' | 'customData'> & {
      angleOffset?: number;
   },
   angleTolerance: number,
   getPosition: GetPositionFn<
      Pick<IWrapGridObject, 'posX' | 'posY' | 'customData'>
   > = (object) => resolveGridPosition(object),
   getAngle: GetAngleFn<
      Pick<IWrapColorNote, 'direction' | 'customData'> & {
         angleOffset?: number;
      }
   > = (object) => resolveNoteAngle(object.direction) + (object.angleOffset || 0),
): boolean {
   return (
      isNotePointing(noteA, noteB, angleTolerance, getPosition, getAngle) ||
      isNotePointing(noteB, noteA, angleTolerance, getPosition, getAngle)
   );
}

// TODO: update with new position/rotation system
export function predictDirection<
   T extends Pick<IWrapBaseNote, 'time' | 'posX' | 'posY' | 'direction'>,
>(endNote: T, startNote: T): number {
   if (isEndNote(endNote, startNote, NoteDirection.ANY)) {
      return endNote.direction === NoteDirection.ANY ? startNote.direction : endNote.direction;
   }
   if (endNote.direction !== NoteDirection.ANY) {
      return endNote.direction;
   }
   if (endNote.time > startNote.time) {
      // if end note on right side
      if (endNote.posX > startNote.posX) {
         if (isHorizontal(endNote, startNote)) {
            return NoteDirection.RIGHT;
         }
      }
      // if end note on left side
      if (endNote.posX < startNote.posX) {
         if (isHorizontal(endNote, startNote)) {
            return NoteDirection.LEFT;
         }
      }
      // if end note is above
      if (endNote.posY > startNote.posY) {
         if (isVertical(endNote, startNote)) {
            return NoteDirection.UP;
         }
         if (endNote.posX > startNote.posX) {
            return NoteDirection.UP_RIGHT;
         }
         if (endNote.posX < startNote.posX) {
            return NoteDirection.UP_LEFT;
         }
      }
      // if end note is below
      if (endNote.posY < startNote.posY) {
         if (isVertical(endNote, startNote)) {
            return NoteDirection.DOWN;
         }
         if (endNote.posX > startNote.posX) {
            return NoteDirection.DOWN_RIGHT;
         }
         if (endNote.posX < startNote.posX) {
            return NoteDirection.DOWN_LEFT;
         }
      }
   }
   return NoteDirection.ANY;
}

/**
 * Check the angle equality of the two notes.
 * @param {(T|number|null)} noteA - First beatmap note, note `direction`, or null value
 * @param {(T|number|null)} noteB - Second beatmap note, note `direction`, or null value
 * @param {number} angleTol - Angle tolerance
 * @param {boolean} equal - If it should check inner or outer angle
 * @returns {boolean} If condition is met
 */
export function checkDirection<T extends Pick<IWrapBaseNote, 'direction'>>(
   noteA: T | number | null,
   noteB: T | number | null,
   angleTol: number,
   equal: boolean,
): boolean {
   let noteAngleA: number;
   let noteAngleB: number;
   if (noteA === null || noteB === null) {
      return false;
   }
   if (typeof noteA === 'number') {
      noteAngleA = noteA;
   } else {
      if (noteA.direction === NoteDirection.ANY) {
         return false;
      }
      noteAngleA = resolveNoteAngle(noteA.direction);
   }
   if (typeof noteB === 'number') {
      noteAngleB = noteB;
   } else {
      if (noteB.direction === NoteDirection.ANY) {
         return false;
      }
      noteAngleB = resolveNoteAngle(noteB.direction);
   }
   return equal
      ? lowestDifferenceMod(noteAngleA, noteAngleB, 360) <= angleTol
      : lowestDifferenceMod(noteAngleA, noteAngleB, 360) >= angleTol;
}
