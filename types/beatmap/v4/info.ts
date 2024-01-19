import { ICustomDataBase } from '../shared/custom/customData.ts';
import { EnvironmentAllName } from '../shared/environment.ts';

export interface IInfo {
   version: '4.0.0';
   contentChecksum: string;
   song: IInfoSong;
   audio: IInfoAudio;
   songPreviewFilename: string;
   coverImageFilename: string;
   environmentNames: EnvironmentAllName[];
   colorSchemes: IInfoColorScheme[];
   difficultyBeatmaps: IInfoDifficulty[];
   customData: ICustomDataBase;
}

export interface IInfoSong {
   title: string;
   subTitle: string;
   author: string;
}

export interface IInfoAudio {
   songChecksum: string;
   songFilename: string;
   songDuration: number; // float
   audioDataFilename: string;
   bpm: number; // float
   previewStartTime: number; // float
   previewDuration: number; // float
}

export interface IInfoColorScheme {
   useOverride: boolean;
   colorSchemeName: string;
   saberAColor: string; // hex, all of them below
   saberBColor: string;
   obstaclesColor: string;
   environmentColor0: string;
   environmentColor1: string;
   environmentColor0Boost: string;
   environmentColor1Boost: string;
}

export interface IInfoBeatmapAuthors {
   mappers: string[];
   lighters: string[];
}

export interface IInfoDifficulty {
   characteristic: string;
   difficulty: string;
   beatmapAuthors: IInfoBeatmapAuthors;
   environmentNameIdx: number; // int
   beatmapColorSchemeIdx: number; // int
   noteJumpMovementSpeed: number; // float
   noteJumpStartBeatOffset: number; // float
   lightshowDataFilename: string;
   beatmapDataFilename: string;
   customData: ICustomDataBase;
}
