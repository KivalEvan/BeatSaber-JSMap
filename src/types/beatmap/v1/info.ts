import type { LooseAutocomplete } from '../../utils.ts';
import type { EnvironmentV3Name } from '../shared/environment.ts';
import type { CharacteristicName } from '../shared/characteristic.ts';
import type { DifficultyName, DifficultyRank } from '../shared/difficulty.ts';
import type { EnvironmentName } from '../shared/environment.ts';
import type { ICustomInfo, ICustomInfoDifficulty } from './custom/info.ts';

export type GenericJSONFilename = `${DifficultyName}${CharacteristicName | ''}.json`;

/**
 * Schema for v1 `Info`.
 */
export interface IInfo extends ICustomInfo {
   songName: string;
   songSubName: string;
   authorName: string;
   beatsPerMinute: number;
   previewStartTime: number;
   previewDuration: number;
   coverImagePath: string;
   environmentName: EnvironmentName | EnvironmentV3Name;
   difficultyLevels: IInfoDifficulty[];
   oneSaber: boolean; // need confirmation
}

type DifficultyRankOld = 2 | 4 | 6 | 8 | 10;

/**
 * Schema for v1 `Info Difficulty`.
 */
export interface IInfoDifficulty extends ICustomInfoDifficulty {
   difficulty: DifficultyName;
   difficultyRank: DifficultyRankOld | DifficultyRank;
   audioPath: string;
   jsonPath: LooseAutocomplete<GenericJSONFilename>;
   characteristic: CharacteristicName;
}
