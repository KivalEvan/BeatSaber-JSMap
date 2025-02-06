import { getFirstInteractiveTime, getLastInteractiveTime } from '../../beatmap/helpers/beatmap.ts';
import type { TimeProcessor } from '../../beatmap/helpers/timeProcessor.ts';
import type { CharacteristicName } from '../../types/beatmap/shared/characteristic.ts';
import type { DifficultyName } from '../../types/beatmap/shared/difficulty.ts';
import { median } from '../../utils/math.ts';
import { generate, next } from './swing.ts';
import type {
   ISwingAnalysis,
   ISwingAnalysisBaseNoteAttribute,
   ISwingAnalysisBeatmapAttribute,
   ISwingCount,
} from './types/swing.ts';

// derived from Uninstaller's Swings Per Second tool
// some variable or function may have been modified
// translating from Python to JavaScript is hard
// this is special function SPS used by ScoreSaber
/**
 * Count the number of swings in period.
 */
export function count<
   T extends ISwingAnalysisBaseNoteAttribute,
>(colorNotes: T[], duration: number, timeProc: TimeProcessor): ISwingCount {
   const swingCount: ISwingCount = {
      left: new Array(Math.floor(duration + 1)).fill(0),
      right: new Array(Math.floor(duration + 1)).fill(0),
   };
   let lastRed!: T;
   let lastBlue!: T;
   for (const nc of colorNotes) {
      const realTime = timeProc.toRealTime(nc.time);
      if (nc.color === 0) {
         if (lastRed) {
            if (next(nc, lastRed, timeProc)) {
               swingCount.left[Math.floor(realTime)]++;
            }
         } else {
            swingCount.left[Math.floor(realTime)]++;
         }
         lastRed = nc;
      }
      if (nc.color === 1) {
         if (lastBlue) {
            if (next(nc, lastBlue, timeProc)) {
               swingCount.right[Math.floor(realTime)]++;
            }
         } else {
            swingCount.right[Math.floor(realTime)]++;
         }
         lastBlue = nc;
      }
   }
   return swingCount;
}

function calcMaxRollingSps(swingArray: number[], x: number): number {
   if (!swingArray.length) {
      return 0;
   }
   if (swingArray.length < x) {
      return swingArray.reduce((a, b) => a + b) / swingArray.length;
   }
   let currentSPS = swingArray.slice(0, x).reduce((a, b) => a + b);
   let maxSPS = currentSPS;
   for (let i = 0; i < swingArray.length - x; i++) {
      currentSPS = currentSPS - swingArray[i] + swingArray[i + x];
      maxSPS = Math.max(maxSPS, currentSPS);
   }
   return maxSPS / x;
}

/**
 * Generate swing analysis from beatmap.
 *
 * Port from Uninstaller's Swings Per Second tool
 */
export function info<T extends ISwingAnalysisBeatmapAttribute>(
   beatmap: T,
   timeProc: TimeProcessor,
   characteristic: CharacteristicName,
   difficulty: DifficultyName,
): ISwingAnalysis<ISwingAnalysisBaseNoteAttribute> {
   const interval = 10;
   const spsInfo = {
      characteristic: characteristic,
      difficulty: difficulty,
      red: { perSecond: 0, peak: 0, median: 0, total: 0 },
      blue: { perSecond: 0, peak: 0, median: 0, total: 0 },
      total: { perSecond: 0, peak: 0, median: 0, total: 0 },
      container: generate(beatmap.difficulty.colorNotes, timeProc),
   };
   const duration = Math.max(
      timeProc.toRealTime(getLastInteractiveTime(beatmap) - getFirstInteractiveTime(beatmap)),
      0,
   );
   const mapDuration = Math.max(timeProc.toRealTime(getLastInteractiveTime(beatmap)), 0);
   const swing = count(beatmap.difficulty.colorNotes, mapDuration, timeProc);
   const swingTotal = swing.left.map((num, i) => num + swing.right[i]);
   if (swingTotal.reduce((a, b) => a + b) === 0) {
      return spsInfo as ISwingAnalysis<T['difficulty']['colorNotes'][number]>;
   }
   const swingIntervalRed = [];
   const swingIntervalBlue = [];
   const swingIntervalTotal = [];

   for (let i = 0, len = Math.ceil(swingTotal.length / interval); i < len; i++) {
      const sliceStart = i * interval;
      let maxInterval = interval;
      if (maxInterval + sliceStart > swingTotal.length) {
         maxInterval = swingTotal.length - sliceStart;
      }
      const sliceRed = swing.left.slice(sliceStart, sliceStart + maxInterval);
      const sliceBlue = swing.right.slice(sliceStart, sliceStart + maxInterval);
      const sliceTotal = swingTotal.slice(sliceStart, sliceStart + maxInterval);
      swingIntervalRed.push(sliceRed.reduce((a, b) => a + b) / maxInterval);
      swingIntervalBlue.push(sliceBlue.reduce((a, b) => a + b) / maxInterval);
      swingIntervalTotal.push(sliceTotal.reduce((a, b) => a + b) / maxInterval);
   }

   spsInfo.red.total = swing.left.reduce((a, b) => a + b);
   spsInfo.red.perSecond = swing.left.reduce((a, b) => a + b) / duration;
   spsInfo.red.peak = calcMaxRollingSps(swing.left, interval);
   spsInfo.red.median = median(swingIntervalRed);
   spsInfo.blue.total = swing.right.reduce((a, b) => a + b);
   spsInfo.blue.perSecond = swing.right.reduce((a, b) => a + b) / duration;
   spsInfo.blue.peak = calcMaxRollingSps(swing.right, interval);
   spsInfo.blue.median = median(swingIntervalBlue);
   spsInfo.total.total = spsInfo.red.total + spsInfo.blue.total;
   spsInfo.total.perSecond = swingTotal.reduce((a, b) => a + b) / duration;
   spsInfo.total.peak = calcMaxRollingSps(swingTotal, interval);
   spsInfo.total.median = median(swingIntervalTotal);

   return spsInfo as ISwingAnalysis<T['difficulty']['colorNotes'][number]>;
}

/**
 * Get first swings analysis that exceeds 40% progression drop.
 */
export function getProgressionMax<T extends ISwingAnalysisBaseNoteAttribute>(
   spsArray: ISwingAnalysis<T>[],
   minThreshold: number,
): { result: ISwingAnalysis<T>; comparedTo?: ISwingAnalysis<T> } | null {
   let prevPerc = 0;
   let currPerc = 0;
   let comparedTo;
   for (const spsMap of spsArray) {
      const baseline = spsMap.total.perSecond;
      if (currPerc > 0 && baseline > 0) {
         prevPerc = Math.abs(1 - currPerc / baseline) * 100;
      }
      currPerc = baseline > 0 ? baseline : currPerc;
      if (currPerc > minThreshold && prevPerc > 40) {
         return { result: spsMap, comparedTo };
      }
      comparedTo = spsMap;
   }
   return null;
}

/**
 * Get first swings analysis that does not reach 10% progression drop.
 */
export function getProgressionMin<T extends ISwingAnalysisBaseNoteAttribute>(
   spsArray: ISwingAnalysis<T>[],
   minThreshold: number,
): { result: ISwingAnalysis<T>; comparedTo?: ISwingAnalysis<T> } | null {
   let prevPerc = Number.MAX_SAFE_INTEGER;
   let currPerc = 0;
   let comparedTo;
   for (const spsMap of spsArray) {
      const baseline = spsMap.total.perSecond;
      if (currPerc > 0 && baseline > 0) {
         prevPerc = Math.abs(1 - currPerc / baseline) * 100;
      }
      currPerc = baseline > 0 ? baseline : currPerc;
      if (currPerc > minThreshold && prevPerc < 10) {
         return { result: spsMap, comparedTo };
      }
      comparedTo = spsMap;
   }
   return null;
}

/**
 * Calculate total percentage drop from highest to lowest swings analysis.
 */
export function calcSpsTotalPercDrop<T extends ISwingAnalysisBaseNoteAttribute>(
   spsArray: ISwingAnalysis<T>[],
): number {
   let highest = 0;
   let lowest = Number.MAX_SAFE_INTEGER;
   spsArray.forEach((spsMap) => {
      const overall = spsMap.total.perSecond;
      if (overall > 0) {
         highest = Math.max(highest, overall);
         lowest = Math.min(lowest, overall);
      }
   });
   return highest || (highest && lowest) ? (1 - lowest / highest) * 100 : 0;
}

/**
 * Get lowest SPS.
 */
export function getSpsLowest<T extends ISwingAnalysisBaseNoteAttribute>(
   spsArray: ISwingAnalysis<T>[],
): number {
   return Math.min(...spsArray.map((e) => e.total.perSecond), Number.MAX_SAFE_INTEGER);
}

/**
 * Get highest SPS.
 */
export function getSpsHighest<T extends ISwingAnalysisBaseNoteAttribute>(
   spsArray: ISwingAnalysis<T>[],
): number {
   return Math.max(...spsArray.map((e) => e.total.perSecond), 0);
}
