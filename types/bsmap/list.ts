import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { IWrapInfoBeatmap } from '../beatmap/wrapper/info.ts';
import { Difficulty as DifficultyV1 } from '../../beatmap/v1/difficulty.ts';
import { Difficulty as DifficultyV2 } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../../beatmap/v3/difficulty.ts';
import { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';

interface IDifficultyListBase {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly settings: IWrapInfoBeatmap;
   data: IWrapDifficulty;
}

interface IDifficultyListV1 extends IDifficultyListBase {
   version: 1;
   data: DifficultyV1;
}

interface IDifficultyListV2 extends IDifficultyListBase {
   version: 2;
   data: DifficultyV2;
}

interface IDifficultyListV3 extends IDifficultyListBase {
   version: 3;
   data: DifficultyV3;
}

export type IDifficultyList = (IDifficultyListV1 | IDifficultyListV2 | IDifficultyListV3)[];
