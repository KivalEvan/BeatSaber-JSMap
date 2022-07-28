import { Difficulty as DifficultyV2 } from './v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from './v3/difficulty.ts';

export function isV2(data: DifficultyV2 | DifficultyV3): data is DifficultyV2 {
    if (data.version.startsWith('2')) {
        return true;
    }
    return false;
}

export function isV3(data: DifficultyV2 | DifficultyV3): data is DifficultyV3 {
    if (data.version.startsWith('3')) {
        return true;
    }
    return false;
}
