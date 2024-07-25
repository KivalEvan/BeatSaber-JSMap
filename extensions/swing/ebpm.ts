import type { ISwingContainer } from './types/swing.ts';

/**
 * Get maximum effective bpm.
 */
export function getMaxEffectiveBpm(swings: ISwingContainer[]): number {
   return Math.max(...swings.map((s) => s.ebpm), 0);
}

/**
 * Get maximum effective bpm swing.
 */
export function getMaxEffectiveBpmSwing(swings: ISwingContainer[]): number {
   return Math.max(...swings.map((s) => s.ebpmSwing), 0);
}
