import { CharacteristicName } from './characteristic.ts';
import { CustomDataInfo, CustomDataInfoDifficulty } from './customData.ts';
import { DifficultyName, DifficultyRank } from './difficulty.ts';
import { EnvironmentName } from './environment.ts';

export interface BeatmapInfo {
    _version: string;
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
    _environmentName: EnvironmentName;
    _allDirectionsEnvironmentName: EnvironmentName;
    _songTimeOffset: number;
    _customData?: CustomDataInfo;
    _difficultyBeatmapSets: BeatmapInfoSet[];
}

export interface BeatmapInfoSet {
    _beatmapCharacteristicName: CharacteristicName;
    _difficultyBeatmaps: BeatmapInfoSetDifficulty[];
}

export interface BeatmapInfoSetDifficulty {
    _difficulty: DifficultyName;
    _difficultyRank: DifficultyRank;
    _beatmapFilename: string;
    _noteJumpMovementSpeed: number;
    _noteJumpStartBeatOffset: number;
    _customData?: CustomDataInfoDifficulty;
}
