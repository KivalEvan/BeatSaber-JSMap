import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { IInfoSetDifficulty } from '../beatmap/shared/info.ts';
import { Difficulty as DifficultyV2 } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../../beatmap/v3/difficulty.ts';

interface IDifficultyListBase {
    readonly characteristic: CharacteristicName;
    readonly difficulty: DifficultyName;
    readonly settings: IInfoSetDifficulty;
}

interface IDifficultyListV2 extends IDifficultyListBase {
    version: 2;
    data: DifficultyV2;
}

interface IDifficultyListV3 extends IDifficultyListBase {
    version: 3;
    data: DifficultyV3;
}

export type IDifficultyList = (IDifficultyListV2 | IDifficultyListV3)[];
