import type { ISwingAnalysisBaseNote, ISwingContainer } from './types/swing.ts';

/**
 * Get maximum effective bpm.
 */
export function getMaxEffectiveBpm<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   return Math.max(...swings.map((s) => s.ebpm), 0);
}

/**
 * Get maximum effective bpm swing.
 */
export function getMaxEffectiveBpmSwing<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   return Math.max(...swings.map((s) => s.ebpmSwing), 0);
}
