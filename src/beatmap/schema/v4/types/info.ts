import type { CharacteristicName } from '../../shared/types/characteristic.ts';
import type { EnvironmentName } from '../../shared/types/environment.ts';
import type { DifficultyName } from '../../shared/types/difficulty.ts';
import type { IItem } from './item.ts';
import type { ICustomDataInfo } from './custom/info.ts';
import type { ICustomDataInfoBeatmap } from './custom/info.ts';

/**
 * Schema for v4 `Info`.
 */
export interface IInfo extends IItem {
   version: '4.0.0' | '4.0.1';
   song: IInfoSong;
   audio: IInfoAudio;
   songPreviewFilename: string;
   coverImageFilename: string;
   environmentNames: EnvironmentName[];
   colorSchemes: IInfoColorScheme[];
   difficultyBeatmaps: IInfoBeatmap[];
   customData?: ICustomDataInfo;
}

/**
 * Song schema for v4 `Info`.
 */
export interface IInfoSong {
   title: string;
   subTitle: string;
   author: string;
}

/**
 * Audio schema for v4 `Info`.
 */
export interface IInfoAudio {
   songFilename: string;
   songDuration: number; // float
   audioDataFilename: string;
   bpm: number; // float
   lufs: number; // float
   previewStartTime: number; // float
   previewDuration: number; // float
}

/**
 * Color scheme schema for v4 `Info`.
 */
export interface IInfoColorScheme {
   colorSchemeName: string;
   overrideNotes: boolean;
   saberAColor: string; // hex, all of them below
   saberBColor: string;
   obstaclesColor: string;
   overrideLights: boolean;
   environmentColor0: string;
   environmentColor1: string;
   environmentColorW?: string;
   environmentColor0Boost: string;
   environmentColor1Boost: string;
   environmentColorWBoost?: string;
}

/**
 * Beatmap authors schema for v4 `Info Beatmap`.
 */
export interface IInfoBeatmapAuthors {
   mappers: string[];
   lighters: string[];
}

/**
 * Schema for v4 `Info Beatmap`.
 */
export interface IInfoBeatmap extends IItem {
   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   beatmapAuthors: IInfoBeatmapAuthors;
   environmentNameIdx: number; // int
   beatmapColorSchemeIdx: number; // int
   noteJumpMovementSpeed: number; // float
   noteJumpStartBeatOffset: number; // float
   lightshowDataFilename: string;
   beatmapDataFilename: string;
   customData?: ICustomDataInfoBeatmap;
}
