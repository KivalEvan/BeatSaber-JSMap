import {
   isDiagonal,
   isHorizontal,
   isInline,
   isSlantedWindow,
   isVertical,
   isWindow,
   resolveGridDistance,
} from '../../beatmap/helpers/core/gridObject.ts';
import type { TimeProcessor } from '../../beatmap/helpers/timeProcessor.ts';
import { NoteDirection } from '../../beatmap/shared/constants.ts';
import type { IWrapBaseObjectAttribute } from '../../types/beatmap/wrapper/baseObject.ts';
import type { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { checkDirection } from '../placement/note.ts';
import type { ISwingContainer } from './types/swing.ts';

/**
 * Generate swings from beatmap notes.
 */
export function generate<T extends IWrapColorNoteAttribute>(
   notes: T[],
   timeProc: TimeProcessor,
): ISwingContainer[] {
   const sc: ISwingContainer[] = [];
   let ebpm = 0;
   let ebpmSwing = 0;
   let minSpeed: number;
   let maxSpeed: number;
   const firstNote: { [key: number]: T } = {};
   const lastNote: { [key: number]: T } = {};
   const swingNoteArray: { [key: number]: T[] } = {
      0: [],
      1: [],
   };
   for (const n of notes) {
      minSpeed = 0;
      maxSpeed = Number.MAX_SAFE_INTEGER;
      if (lastNote[n.color]) {
         if (next(n, lastNote[n.color], timeProc, swingNoteArray[n.color])) {
            minSpeed = calcMinSliderSpeed(swingNoteArray[n.color], timeProc);
            maxSpeed = calcMaxSliderSpeed(swingNoteArray[n.color], timeProc);
            if (!(minSpeed > 0 && maxSpeed !== Infinity)) {
               minSpeed = 0;
               maxSpeed = 0;
            }
            ebpmSwing = calcEBPMBetweenObject(n, firstNote[n.color], timeProc);
            ebpm = calcEBPMBetweenObject(n, lastNote[n.color], timeProc);
            sc.push({
               time: firstNote[n.color].time,
               duration: lastNote[n.color].time - firstNote[n.color].time,
               data: swingNoteArray[n.color],
               ebpm,
               ebpmSwing,
               maxSpeed,
               minSpeed,
            });
            firstNote[n.color] = n;
            swingNoteArray[n.color] = [];
         }
      } else {
         firstNote[n.color] = n;
      }
      lastNote[n.color] = n;
      swingNoteArray[n.color].push(n);
   }
   for (let color = 0; color < 2; color++) {
      if (lastNote[color]) {
         minSpeed = calcMinSliderSpeed(swingNoteArray[color], timeProc);
         maxSpeed = calcMaxSliderSpeed(swingNoteArray[color], timeProc);
         if (!(minSpeed > 0 && maxSpeed !== Infinity)) {
            minSpeed = 0;
            maxSpeed = 0;
         }
         sc.push({
            time: firstNote[color].time,
            duration: lastNote[color].time - firstNote[color].time,
            data: swingNoteArray[color],
            ebpm,
            ebpmSwing,
            maxSpeed,
            minSpeed,
         });
      }
   }
   return sc;
}

// Thanks Qwasyx#3000 for improved swing detection
/**
 * Check if next swing happen from `prevNote` to `currNote`.
 */
export function next<T extends IWrapColorNoteAttribute>(
   currNote: T,
   prevNote: T,
   timeProc: TimeProcessor,
   context?: T[],
): boolean {
   if (
      context &&
      context.length > 0 &&
      timeProc.toRealTime(prevNote.time) + 0.005 <
         timeProc.toRealTime(currNote.time) &&
      currNote.direction !== NoteDirection.ANY
   ) {
      for (const n of context) {
         if (
            n.direction !== NoteDirection.ANY &&
            checkDirection(currNote, n, 90, false)
         ) {
            return true;
         }
      }
   }
   if (context && context.length > 0) {
      for (const other of context) {
         if (isInline(currNote, other)) {
            return true;
         }
      }
   }
   return (
      (isWindow(currNote, prevNote) &&
         timeProc.toRealTime(currNote.time - prevNote.time) > 0.08) ||
      timeProc.toRealTime(currNote.time - prevNote.time) > 0.07
   );
}

/** Calculate effective BPM between `currObj` and `prevObj`. */
export function calcEBPMBetweenObject<T extends IWrapBaseObjectAttribute>(
   currObj: T,
   prevObj: T,
   timeProc: TimeProcessor,
): number {
   return (
      timeProc.bpm /
      (timeProc.toBeatTime(
         timeProc.toRealTime(currObj.time) - timeProc.toRealTime(prevObj.time),
         false,
      ) *
         2)
   );
}

/**
 * Calculate minimum slider speed given notes in a swing.
 *
 * Higher value is slower.
 */
function calcMinSliderSpeed<T extends IWrapColorNoteAttribute>(
   notes: T[],
   timeProc: TimeProcessor,
): number {
   let hasStraight = false;
   let hasDiagonal = false;
   let curvedSpeed = 0;
   const speed = timeProc.toRealTime(
      Math.max(
         ...notes.map((_, i) => {
            if (i === 0) {
               return 0;
            }
            const distance = resolveGridDistance(notes[i], notes[i - 1]) || 1;
            if (
               (isHorizontal(notes[i], notes[i - 1]) || isVertical(notes[i], notes[i - 1])) &&
               !hasStraight
            ) {
               hasStraight = true;
               curvedSpeed = (notes[i].time - notes[i - 1].time) / distance;
            }
            hasDiagonal = isDiagonal(notes[i], notes[i - 1]) ||
               isSlantedWindow(notes[i], notes[i - 1]) ||
               hasDiagonal;
            return (notes[i].time - notes[i - 1].time) / distance;
         }),
      ),
   );
   if (hasStraight && hasDiagonal) {
      return timeProc.toRealTime(curvedSpeed);
   }
   return speed;
}

/**
 * Calculate maximum slider speed given notes in a swing.
 *
 * Lower value is faster.
 */
function calcMaxSliderSpeed<T extends IWrapColorNoteAttribute>(
   notes: T[],
   timeProc: TimeProcessor,
): number {
   let hasStraight = false;
   let hasDiagonal = false;
   let curvedSpeed = Number.MAX_SAFE_INTEGER;
   const speed = timeProc.toRealTime(
      Math.min(
         ...notes.map((_, i) => {
            if (i === 0) {
               return Number.MAX_SAFE_INTEGER;
            }
            const distance = resolveGridDistance(notes[i], notes[i - 1]) || 1;
            if (
               (isHorizontal(notes[i], notes[i - 1]) || isVertical(notes[i], notes[i - 1])) &&
               !hasStraight
            ) {
               hasStraight = true;
               curvedSpeed = (notes[i].time - notes[i - 1].time) / distance;
            }
            hasDiagonal = isDiagonal(notes[i], notes[i - 1]) ||
               isSlantedWindow(notes[i], notes[i - 1]) ||
               hasDiagonal;
            return (notes[i].time - notes[i - 1].time) / distance;
         }),
      ),
   );
   if (hasStraight && hasDiagonal) {
      return timeProc.toRealTime(curvedSpeed);
   }
   return speed;
}
