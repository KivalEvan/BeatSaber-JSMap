import type { IWrapBombNote } from '../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapColorNote } from '../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapBaseSlider } from '../../types/beatmap/wrapper/baseSlider.ts';
import type { ICountNote, ICountStatsNote } from './types/stats.ts';
import type { IWrapBaseNote } from '../../types/beatmap/wrapper/baseNote.ts';
import type { IWrapGridObjectAttribute } from '../../types/beatmap/wrapper/gridObject.ts';
import type { GetAngleFn } from '../../types/beatmap/shared/functions.ts';

/**
 * Count number of red, blue, and bomb notes with their properties in given array and return a note count object.
 *
 * ```ts
 * const list = count(notes);
 * console.log(list);
 * ```
 */
export function countNote(notes: (IWrapColorNote | IWrapBaseSlider)[]): ICountNote {
   const noteCount: ICountNote = {
      red: {
         total: 0,
         chroma: 0,
         noodleExtensions: 0,
         mappingExtensions: 0,
      },
      blue: {
         total: 0,
         chroma: 0,
         noodleExtensions: 0,
         mappingExtensions: 0,
      },
   };
   for (let i = notes.length - 1; i >= 0; i--) {
      if (notes[i].color === 0) {
         noteCount.red.total++;
         if (notes[i].check()) {
            noteCount.red.chroma++;
         }
         if (notes[i].check()) {
            noteCount.red.noodleExtensions++;
         }
         if (notes[i].check()) {
            noteCount.red.mappingExtensions++;
         }
      } else if (notes[i].color === 1) {
         noteCount.blue.total++;
         if (notes[i].check()) {
            noteCount.blue.chroma++;
         }
         if (notes[i].check()) {
            noteCount.blue.noodleExtensions++;
         }
         if (notes[i].check()) {
            noteCount.blue.mappingExtensions++;
         }
      }
   }
   return noteCount;
}

export function countBomb(bombs: IWrapBombNote[]): ICountStatsNote {
   const bombCount: ICountStatsNote = {
      total: 0,
      chroma: 0,
      noodleExtensions: 0,
      mappingExtensions: 0,
   };
   for (let i = bombs.length - 1; i >= 0; i--) {
      bombCount.total++;
      if (bombs[i].check()) {
         bombCount.chroma++;
      }
      if (bombs[i].check()) {
         bombCount.noodleExtensions++;
      }
      if (bombs[i].check()) {
         bombCount.mappingExtensions++;
      }
   }
   return bombCount;
}

/**
 * Count number of specified pos X in a given array and return a counted number of pos X.
 *
 * ```ts
 * const xCount = countX(notes, 0);
 * ```
 */
export function countX(objs: IWrapGridObjectAttribute[], x: number): number {
   return objs.filter((n) => n.posX === x).length;
}

/**
 * Count number of specified pos Y in a given array and return a counted number of pos Y.
 *
 * ```ts
 * const yCount = countY(notes, 0);
 * ```
 */
export function countY(objs: IWrapGridObjectAttribute[], y: number): number {
   return objs.filter((n) => n.posY === y).length;
}

/**
 * Count number of specified pos X and Y in a given array and return a counted number of pos X and Y.
 *
 * ```ts
 * const xyCount = countXY(notes, 0, 0);
 * ```
 */
export function countXY(objs: IWrapGridObjectAttribute[], x: number, y: number): number {
   return objs.filter((n) => n.posX === x && n.posY === y).length;
}

/**
 * Count number of specified `direction` in a given array and return a counted number of `direction`.
 * ```ts
 * const cdCount = countDirection(notes, 0);
 * ```
 */
export function countDirection(notes: IWrapBaseNote[], cd: number): number {
   return notes.filter((n) => n.direction === cd).length;
}

/**
 * Count number of specified angle in a given array and return a counted number of angle.
 *
 * ```ts
 * const angleCount = countAngle(notes, 0);
 * ```
 */
export function countAngle(
   notes: IWrapBaseNote[],
   angle: number,
   fn?: GetAngleFn<IWrapBaseNote>,
): number {
   return notes.filter((n) => n.getAngle(fn) === angle).length;
}
