import { InfoData } from '../types/beatmap/shared/info.ts';
import { DifficultyData as DifficultyDataV2 } from '../types/beatmap/v2/difficulty.ts';
import { IDifficultyData as IDifficultyDataV3 } from '../types/beatmap/v3/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './v3/difficulty.ts';

export const isV2 = (
    data: InfoData | DifficultyDataV2 | DifficultyDataV3 | IDifficultyDataV3
): data is InfoData | DifficultyDataV2 => {
    if ((data as InfoData | DifficultyDataV2)._version) {
        return true;
    }
    return false;
};

export const isV3 = (
    data: InfoData | DifficultyDataV2 | DifficultyDataV3 | IDifficultyDataV3
): data is DifficultyDataV3 | IDifficultyDataV3 => {
    if ((data as DifficultyDataV3).version) {
        return true;
    }
    return false;
};
