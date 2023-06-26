import { LooseAutocomplete } from '../../utils.ts';
import { EnvironmentV3Name } from '../shared/environment.ts';
import { CharacteristicName } from '../shared/characteristic.ts';
import { DifficultyName, DifficultyRank } from '../shared/difficulty.ts';
import { EnvironmentName } from '../shared/environment.ts';
import { ICustomInfo, ICustomInfoDifficulty } from './custom/info.ts';

export type GenericJSONFileName = `${DifficultyName}${CharacteristicName | ''}.json`;

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

export interface IInfoDifficulty extends ICustomInfoDifficulty {
   difficulty: DifficultyName;
   difficultyRank: DifficultyRankOld | DifficultyRank;
   audioPath: string;
   jsonPath: LooseAutocomplete<GenericJSONFileName>;
   characteristic: CharacteristicName;
}
