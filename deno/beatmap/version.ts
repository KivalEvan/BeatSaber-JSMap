import { InfoData } from './shared/types/info.ts';
import { DifficultyData as DifficultyDataV2 } from './v2/types/difficulty.ts';
import {
    IDifficultyData as IDifficultyDataV3,
    DifficultyData as DifficultyDataV3,
} from './v3/types/difficulty.ts';

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
