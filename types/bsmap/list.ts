import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { IInfoSetDifficultyData } from '../beatmap/shared/info.ts';
import { DifficultyData as DifficultyDataV2 } from '../../beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from '../../beatmap/v3/difficulty.ts';

interface IDifficultyListBase {
    readonly characteristic: CharacteristicName;
    readonly difficulty: DifficultyName;
    readonly settings: IInfoSetDifficultyData;
}

interface IDifficultyListV2 extends IDifficultyListBase {
    version: 2;
    data: DifficultyDataV2;
}

interface IDifficultyListV3 extends IDifficultyListBase {
    version: 3;
    data: DifficultyDataV3;
}

export type IDifficultyList = (IDifficultyListV2 | IDifficultyListV3)[];
