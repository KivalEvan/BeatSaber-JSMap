import type { IColor } from '../../colors.ts';
import type { LooseAutocomplete } from '../../utils.ts';
import type { CharacteristicName } from '../shared/characteristic.ts';
import type { DifficultyName, DifficultyRank } from '../shared/difficulty.ts';
import type {
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
} from '../shared/environment.ts';
import type { GenericBeatmapFilename } from '../shared/filename.ts';
import type {
   ICustomDataInfo,
   ICustomDataInfoDifficulty,
   ICustomDataInfoSet,
} from './custom/info.ts';

/**
 * Schema for v2 `Info`.
 */
export interface IInfo {
   _version: `2.${0 | 1}.0`;
   _songName: string;
   _songSubName: string;
   _songAuthorName: string;
   _levelAuthorName: string;
   /**
    * **Type:** `f32`
    */
   _beatsPerMinute: number;
   /**
    * **Type:** `f32`
    */
   _shuffle: number;
   /**
    * **Type:** `f32`
    */
   _shufflePeriod: number;
   /**
    * **Type:** `f32`
    */
   _previewStartTime: number;
   /**
    * **Type:** `f32`
    */
   _previewDuration: number;
   _songFilename: string;
   _coverImageFilename: string;
   _environmentName: EnvironmentName | EnvironmentV3Name;
   _allDirectionsEnvironmentName?: Environment360Name;
   _environmentNames: EnvironmentAllName[];
   _colorSchemes: IInfoColorScheme[];
   /**
    * **Type:** `f32`
    */
   _songTimeOffset: number;
   _customData?: ICustomDataInfo;
   _difficultyBeatmapSets: IInfoSet[];
}

/**
 * Color scheme schema for v2 `Info`.
 */
export interface IInfoColorScheme {
   useOverride: boolean;
   colorScheme: IInfoColorSchemeData;
}

/**
 * Color scheme data schema for v2 `Info`.
 */
export interface IInfoColorSchemeData {
   colorSchemeId: string;
   saberAColor: Required<IColor>;
   saberBColor: Required<IColor>;
   environmentColor0: Required<IColor>;
   environmentColor1: Required<IColor>;
   environmentColorW?: Required<IColor>;
   obstaclesColor: Required<IColor>;
   environmentColor0Boost: Required<IColor>;
   environmentColor1Boost: Required<IColor>;
   environmentColorWBoost?: Required<IColor>;
}

/**
 * Set schema for v2 `Info`.
 */
export interface IInfoSet {
   /**
    * **Type:** {@linkcode CharacteristicName}
    */
   _beatmapCharacteristicName: CharacteristicName;
   _difficultyBeatmaps: IInfoDifficulty[];
   _customData?: ICustomDataInfoSet;
}

/**
 * Schema for v2 `Info Difficulty`.
 */
export interface IInfoDifficulty {
   /**
    * **Type:** {@linkcode DifficultyName}
    */
   _difficulty: DifficultyName;
   /**
    * **Type:** {@linkcode DifficultyRank}
    */
   _difficultyRank: DifficultyRank;
   _beatmapFilename: LooseAutocomplete<GenericBeatmapFilename>;
   /**
    * **Type:** `f32`
    */
   _noteJumpMovementSpeed: number;
   /**
    * **Type:** `f32`
    */
   _noteJumpStartBeatOffset: number;
   /**
    * **Type:** `i32`
    */
   _beatmapColorSchemeIdx: number;
   /**
    * **Type:** `i32`
    */
   _environmentNameIdx: number;
   _customData?: ICustomDataInfoDifficulty;
}
