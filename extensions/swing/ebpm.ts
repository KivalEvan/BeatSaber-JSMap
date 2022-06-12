import { ISwingContainer } from './types/swing.ts';

export const getMaxEffectiveBPM = (swings: ISwingContainer[]): number => {
    return Math.max(...swings.map((s) => s.ebpm), 0);
};

export const getMaxEffectiveBPMSwing = (swings: ISwingContainer[]): number => {
    return Math.max(...swings.map((s) => s.ebpmSwing), 0);
};
