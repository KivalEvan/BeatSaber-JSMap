import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { InfoSetDifficultyData } from '../beatmap/shared/info.ts';
import { DifficultyData as DifficultyDataV2 } from '../beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from '../../beatmap/v3/difficulty.ts';

export type DifficultyList = {
    characteristic: CharacteristicName;
    difficulty: DifficultyName;
    settings: InfoSetDifficultyData;
    fileName: string;
    data: DifficultyDataV2 | DifficultyDataV3;
}[];
