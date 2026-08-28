import type { ISwingAnalysisBaseNote, ISwingContainer } from './types/swing.ts';

/**
 * Get maximum effective bpm.
 */
export function getMaxEffectiveBpm<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   let maxBpm = 0;
   const length = swings.length;
   for (let i = 0; i < length; i++) {
      maxBpm = Math.max(maxBpm, i in swings ? swings[i].ebpm : Number.NaN);
   }
   return maxBpm;
}

/**
 * Get maximum effective bpm swing.
 */
export function getMaxEffectiveBpmSwing<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   let maxBpmSwing = 0;
   const length = swings.length;
   for (let i = 0; i < length; i++) {
      maxBpmSwing = Math.max(
         maxBpmSwing,
         i in swings ? swings[i].ebpmSwing : Number.NaN,
      );
   }
   return maxBpmSwing;
}
