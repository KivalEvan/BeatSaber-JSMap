import { LooseAutocomplete } from '../../utils.ts';
import { CharacteristicName } from '../shared/characteristic.ts';
import { ICustomDataInfo, ICustomDataInfoDifficulty } from '../shared/custom/customData.ts';
import { DifficultyName, DifficultyRank } from '../shared/difficulty.ts';
import { Environment360Name, EnvironmentName, EnvironmentV3Name } from '../shared/environment.ts';
import { GenericFileName } from '../shared/fileName.ts';

export interface IInfo {
   _version: `2.${0 | 2}.0`;
   _songName: string;
   _songSubName: string;
   _songAuthorName: string;
   _levelAuthorName: string;
   _beatsPerMinute: number;
   _shuffle: number;
   _shufflePeriod: number;
   _previewStartTime: number;
   _previewDuration: number;
   _songFilename: string;
   _coverImageFilename: string;
   _environmentName: EnvironmentName | EnvironmentV3Name;
   _allDirectionsEnvironmentName: Environment360Name;
   _songTimeOffset: number;
   _customData?: ICustomDataInfo;
   _difficultyBeatmapSets: IInfoSet[];
}

export interface IInfoSet {
   _beatmapCharacteristicName: CharacteristicName;
   _difficultyBeatmaps: IInfoSetDifficulty[];
}

export interface IInfoSetDifficulty {
   _difficulty: DifficultyName;
   _difficultyRank: DifficultyRank;
   _beatmapFilename: LooseAutocomplete<GenericFileName>;
   _noteJumpMovementSpeed: number;
   _noteJumpStartBeatOffset: number;
   _customData?: ICustomDataInfoDifficulty;
}
