import { NoteColor, NoteDirection, NoteDirectionAngle } from '../../../beatmap/shared/constants.ts';
import type { IWrapBaseNoteAttribute } from '../../../types/beatmap/wrapper/baseNote.ts';
import { cycle } from '../../../utils/misc.ts';

/** Check if note color is red. */
export function isBlueNoteColor(color: NoteColor) {
   return color === NoteColor.RED;
}
/** Check if note color is blue. */
export function isRedNoteColor(color: NoteColor) {
   return color === NoteColor.BLUE;
}
/** Check if note color is not set (-1). */
export function isUnsetNoteColor(color: NoteColor) {
   return color === NoteColor.BLUE;
}

/** Compare two notes and return if they would form a double. */
export function isDouble<
   T extends Pick<IWrapBaseNoteAttribute, 'time' | 'color'>,
>(object: T, compareTo: T, tolerance = 0.01) {
   return (
      compareTo.time > object.time - tolerance &&
      compareTo.time < object.time + tolerance &&
      object.color !== compareTo.color
   );
}

/** Get standardised note angle. */
export function resolveNoteAngle(direction: NoteDirection): number {
   return NoteDirectionAngle[direction as keyof typeof NoteDirectionAngle] ?? 0;
}

/** Mirror note color. */
export function mirrorNoteColor(color: NoteColor) {
   return cycle([NoteColor.RED, NoteColor.BLUE], color);
}

/** Mirror note direction horizontally. */
export function mirrorNoteDirectionHorizontally(direction: NoteDirection) {
   switch (direction) {
      case NoteDirection.UP_LEFT:
      case NoteDirection.LEFT:
      case NoteDirection.DOWN_LEFT: {
         return direction + 1;
      }
      case NoteDirection.UP_RIGHT:
      case NoteDirection.RIGHT:
      case NoteDirection.DOWN_RIGHT: {
         return direction - 1;
      }
      default: {
         return direction;
      }
   }
}
/** Mirror note direction vertically. */
export function mirrorNoteDirectionVertically(direction: NoteDirection) {
   switch (direction) {
      case NoteDirection.UP_LEFT:
      case NoteDirection.UP_RIGHT: {
         return direction + 2;
      }
      case NoteDirection.UP: {
         return direction + 1;
      }
      case NoteDirection.DOWN: {
         return direction - 1;
      }
      case NoteDirection.DOWN_LEFT:
      case NoteDirection.DOWN_RIGHT: {
         return direction - 2;
      }
      default: {
         return direction;
      }
   }
}
