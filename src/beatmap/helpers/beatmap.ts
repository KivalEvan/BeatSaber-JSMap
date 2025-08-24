import type { ISwingAnalysisBeatmap } from '../../extensions/swing/types/swing.ts';
import type { IWrapBeatmapSubset } from '../schema/wrapper/types/beatmap.ts';
import { isInteractiveObstacle } from './core/obstacle.ts';
import { sortNoteFn } from './sort.ts';
import type { TimeProcessor } from './timeProcessor.ts';

/** Calculates the number of notes per second. */
export function calculateNps<
   T extends IWrapBeatmapSubset<'colorNotes', never>,
>(beatmap: T, duration: number): number {
   const notes = beatmap.difficulty.colorNotes;
   return duration ? notes.length / duration : 0;
}

/** Calculates the peak number of notes per second given beat count. */
export function calculateNpsPeak<
   T extends IWrapBeatmapSubset<'colorNotes', 'time'>,
>(beatmap: T, beatCount: number, timeProcessor: TimeProcessor): number {
   let peakNPS = 0;
   let currentSectionStart = 0;
   const notes = beatmap.difficulty.colorNotes;

   for (let i = 0; i < notes.length; i++) {
      while (notes[i].time - notes[currentSectionStart].time > beatCount) {
         currentSectionStart++;
      }
      peakNPS = Math.max(
         peakNPS,
         (i - currentSectionStart + 1) / timeProcessor.toRealTime(beatCount),
      );
   }

   return peakNPS;
}

/**
 * Get the first interactive time.
 *
 * Color notes, bomb notes, chains and obstacles in middle lane are considered interactive object.
 */
export function getFirstInteractiveTime<
   T extends ISwingAnalysisBeatmap,
>(beatmap: T): number {
   const notes = [
      ...beatmap.difficulty.colorNotes,
      ...beatmap.difficulty.bombNotes,
      ...beatmap.difficulty.chains,
   ].sort(sortNoteFn);
   let firstNoteTime = Number.MAX_VALUE;
   if (notes.length > 0) {
      firstNoteTime = notes[0].time;
   }
   const firstInteractiveObstacleTime = findFirstInteractiveObstacleTime(beatmap);
   return Math.min(firstNoteTime, firstInteractiveObstacleTime);
}

/**
 * Get the last interactive time.
 *
 * Color notes, bomb notes, chains and obstacles in middle lane are considered interactive object.
 */
export function getLastInteractiveTime<
   T extends ISwingAnalysisBeatmap,
>(beatmap: T): number {
   const notes = [
      ...beatmap.difficulty.colorNotes,
      ...beatmap.difficulty.bombNotes,
      ...beatmap.difficulty.chains,
   ].sort(sortNoteFn);
   let lastNoteTime = 0;
   if (notes.length > 0) {
      lastNoteTime = notes[notes.length - 1].time;
   }
   const lastInteractiveObstacleTime = findLastInteractiveObstacleTime(beatmap);
   return Math.max(lastNoteTime, lastInteractiveObstacleTime);
}

/**
 * Get the first obstacle interactive time.
 */
export function findFirstInteractiveObstacleTime<
   T extends IWrapBeatmapSubset<'obstacles', 'time' | 'posX' | 'width'>,
>(beatmap: T): number {
   for (let i = 0, len = beatmap.difficulty.obstacles.length; i < len; i++) {
      if (isInteractiveObstacle(beatmap.difficulty.obstacles[i])) {
         return beatmap.difficulty.obstacles[i].time;
      }
   }
   return Number.MAX_VALUE;
}

/**
 * Get the last obstacle interactive time.
 */
export function findLastInteractiveObstacleTime<
   T extends IWrapBeatmapSubset<'obstacles', 'time' | 'posX' | 'duration' | 'width'>,
>(beatmap: T): number {
   let obstacleEnd = 0;
   for (let i = beatmap.difficulty.obstacles.length - 1; i >= 0; i--) {
      if (isInteractiveObstacle(beatmap.difficulty.obstacles[i])) {
         obstacleEnd = Math.max(
            obstacleEnd,
            beatmap.difficulty.obstacles[i].time + beatmap.difficulty.obstacles[i].duration,
         );
      }
   }
   return obstacleEnd;
}
