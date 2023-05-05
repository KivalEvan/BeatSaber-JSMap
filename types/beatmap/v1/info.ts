import { CharacteristicName } from '../shared/characteristic.ts';
import { DifficultyName, DifficultyRank } from '../shared/difficulty.ts';
import { EnvironmentAllName } from '../shared/environment.ts';
import { ICustomInfo, ICustomInfoDifficulty } from './custom/info.ts';

export interface IInfo extends ICustomInfo {
    songName: string;
    songSubName: string;
    authorName: string;
    beatsPerMinute: number;
    previewStartTime: number;
    previewDuration: number;
    coverImagePath: string;
    environmentName: EnvironmentAllName;
    difficultyLevels: IInfoDifficulty[];
    oneSaber: boolean; // need confirmation
}

type DifficultyRankOld = 2 | 4 | 6 | 8 | 10;

export interface IInfoDifficulty extends ICustomInfoDifficulty {
    difficulty: DifficultyName;
    difficultyRank: DifficultyRankOld | DifficultyRank;
    audioPath: string;
    jsonPath: string;
    characteristic: CharacteristicName;
}
