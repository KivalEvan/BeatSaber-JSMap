import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { IWrapInfoDifficulty } from '../beatmap/wrapper/info.ts';
import { Difficulty as V1Difficulty } from '../../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../../beatmap/v3/difficulty.ts';
import { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';

interface ILoadInfoDataBase {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly settings: IWrapInfoDifficulty;
   data: IWrapDifficulty;
}

interface IV1LoadInfoDifficulty extends ILoadInfoDataBase {
   version: 1;
   data: V1Difficulty;
}

interface IV2LoadInfoDifficulty extends ILoadInfoDataBase {
   version: 2;
   data: V2Difficulty;
}

interface IV3LoadInfoDifficulty extends ILoadInfoDataBase {
   version: 3;
   data: V3Difficulty;
}

export type ILoadInfoData = IV1LoadInfoDifficulty | IV2LoadInfoDifficulty | IV3LoadInfoDifficulty;
