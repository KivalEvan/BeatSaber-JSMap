import { NoteColor, NoteDirection, NoteDirectionAngle } from '../../../beatmap/shared/constants.ts';
import type { IWrapBaseNote } from '../../../types/beatmap/wrapper/baseNote.ts';
import { cycle } from '../../../utils/misc/iterator.ts';

/** Check if note color is red. */
export function isRedNoteColor(color: NoteColor): color is NoteColor.RED {
   return color === NoteColor.RED;
}
/** Check if note color is blue. */
export function isBlueNoteColor(color: NoteColor): color is NoteColor.BLUE {
   return color === NoteColor.BLUE;
}
/** Check if note color is not set (-1). */
export function isUnsetNoteColor(color: NoteColor): color is NoteColor.NONE {
   return color === NoteColor.NONE;
}

/** Compare two notes and return if they would form a double. */
export function isDouble<
   T extends Pick<IWrapBaseNote, 'time' | 'color'>,
>(object: T, compareTo: T, tolerance = 0.01): boolean {
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
export function mirrorNoteColor(color: NoteColor): NoteColor {
   return cycle([NoteColor.RED, NoteColor.BLUE], color);
}

/** Mirror note direction horizontally. */
export function mirrorNoteDirectionHorizontally(direction: NoteDirection): number {
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
export function mirrorNoteDirectionVertically(direction: NoteDirection): number {
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
