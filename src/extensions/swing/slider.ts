import type { ISwingAnalysisBaseNote, ISwingContainer } from './types/swing.ts';

/** Get minimum value of slider speed from swings. */
export function getMinSliderSpeed<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   return Math.max(...swings.map((s) => s.minSpeed), 0);
}

/** Get maximum value of slider speed from swings. */
export function getMaxSliderSpeed<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   const arr = swings.map((s) => s.maxSpeed).filter((n) => n !== 0);
   return arr.length ? Math.min(...arr) : 0;
}
