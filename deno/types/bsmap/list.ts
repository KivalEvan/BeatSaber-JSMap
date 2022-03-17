import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { IInfoSetDifficultyData } from '../beatmap/shared/info.ts';
import { DifficultyData as DifficultyDataV2 } from '../../beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from '../../beatmap/v3/difficulty.ts';

interface DifficultyListBase {
    characteristic: CharacteristicName;
    difficulty: DifficultyName;
    settings: IInfoSetDifficultyData;
    fileName: string;
}

interface DifficultyListV2 extends DifficultyListBase {
    version: 2;
    data: DifficultyDataV2;
}

interface DifficultyListV3 extends DifficultyListBase {
    version: 3;
    data: DifficultyDataV3;
}

export type DifficultyList = (DifficultyListV2 | DifficultyListV3)[];
