import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';
import { IDifficulty as IDifficultyV2 } from '../types/beatmap/v2/difficulty.ts';
import { IDifficulty as IDifficultyV3 } from '../types/beatmap/v3/difficulty.ts';
import { Difficulty as DifficultyV2 } from './v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from './v3/difficulty.ts';

export function isV2(data: unknown): data is IDifficultyV2;
export function isV2(data: IWrapDifficulty): data is DifficultyV2;
export function isV2(data: unknown) {
    return (
        data instanceof DifficultyV2 ||
        (typeof data === 'object' && data != null && '_version' in data)
    );
}

export function isV3(data: unknown): data is IDifficultyV3;
export function isV3(data: IWrapDifficulty): data is DifficultyV3;
export function isV3(data: unknown) {
    return (
        data instanceof DifficultyV3 ||
        (typeof data === 'object' && data != null && 'version' in data)
    );
}
