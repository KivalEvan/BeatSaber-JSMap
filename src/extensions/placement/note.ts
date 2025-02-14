import { resolveNoteAngle } from '../../beatmap/helpers/core/baseNote.ts';
import {
   isHorizontal,
   isVertical,
   resolveGridPosition,
} from '../../beatmap/helpers/core/gridObject.ts';
import { NoteDirection } from '../../beatmap/shared/constants.ts';
import type { IWrapBaseNote } from '../../types/beatmap/wrapper/baseNote.ts';
import type { Vector2 } from '../../types/vector.ts';
import { mod, radToDeg, shortRotDistance } from '../../utils/math/trigonometry.ts';

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

function hasIntersect<
   T extends Pick<IWrapBaseNote, 'posX' | 'posY' | 'direction'>,
>(
   currNote: T,
   compareTo: T,
   angleDistances: [range: number, distance: number, offset?: number][],
   ahead = false,
): boolean {
   if (currNote.direction !== NoteDirection.ANY) {
      return false;
   }
   const [nX1, nY1] = resolveGridPosition(currNote);
   const [nX2, nY2] = resolveGridPosition(compareTo);
   const hackValue = ahead ? 540 : 360;
   const directionAngle = resolveNoteAngle(currNote.direction);
   const noteLookAngle = (radToDeg(Math.atan2(nY1 - nY2, nX1 - nX2)) + 450) % 360;
   return angleDistances.some(([angleRange, maxDistance, offset]) => {
      offset = offset ?? 0;
      const angleStart = (directionAngle + hackValue - angleRange + offset) % 360;
      const angleEnd = (directionAngle + hackValue + angleRange + offset) % 360;
      return (
         maxDistance >=
            Math.sqrt(Math.pow(nX1 - nX2, 2) + Math.pow(nY1 - nY2, 2)) &&
         ((angleStart < angleEnd &&
            angleStart <= noteLookAngle &&
            noteLookAngle <= angleEnd) ||
            (angleStart >= angleEnd &&
               (noteLookAngle <= angleEnd || noteLookAngle >= angleStart)))
      );
   });
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
export function isIntersectNote<
   T extends Pick<IWrapBaseNote, 'posX' | 'posY' | 'direction'>,
>(
   noteA: T,
   noteB: T,
   angleDistances: [range: number, distance: number, offset?: number][],
   ahead = false,
): [noteAIntersect: boolean, noteBIntersect: boolean] {
   return [
      hasIntersect(noteA, noteB, angleDistances, ahead),
      hasIntersect(noteB, noteA, angleDistances, ahead),
   ];
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
      ? shortRotDistance(noteAngleA, noteAngleB, 360) <= angleTol
      : shortRotDistance(noteAngleA, noteAngleB, 360) >= angleTol;
}
