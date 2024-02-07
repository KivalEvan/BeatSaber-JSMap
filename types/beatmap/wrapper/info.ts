// deno-lint-ignore-file no-explicit-any
import { LooseAutocomplete } from '../../utils.ts';
import { Version } from '../shared/version.ts';
import { CharacteristicName } from '../shared/characteristic.ts';
import { DifficultyName } from '../shared/difficulty.ts';
import { EnvironmentAllName } from '../shared/environment.ts';
import { GenericFileName } from '../shared/filename.ts';
import { IWrapBaseItem } from './baseItem.ts';
import { IColor } from '../../colors.ts';

export interface IWrapInfoAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
   TDifficulty extends { [P in keyof TDifficulty]: TDifficulty[P] } = Record<string, any>,
> extends IWrapBaseItem<T> {
   readonly version: Version;
   contentChecksum: string;
   song: IWrapInfoSong;
   audio: IWrapInfoAudio;
   songPreviewFilename: string;
   coverImageFilename: string;
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   difficulties: IWrapInfoDifficulty<TDifficulty>[];

   filename: string;
}

export interface IWrapInfoSong {
   title: string;
   subTitle: string;
   author: string;
}

export interface IWrapInfoAudio {
   checksum: string;
   filename: string;
   duration: number; // float
   audioDataFilename: string;
   bpm: number; // float
   previewStartTime: number; // float
   previewDuration: number; // float
}

export interface IWrapInfoColorScheme {
   useOverride: boolean;
   name: string;
   saberLeftColor: Required<IColor>;
   saberRightColor: Required<IColor>;
   environment0Color: Required<IColor>;
   environment1Color: Required<IColor>;
   environmentWColor?: Required<IColor>;
   obstaclesColor: Required<IColor>;
   environment0ColorBoost: Required<IColor>;
   environment1ColorBoost: Required<IColor>;
   environmentWColorBoost?: Required<IColor>;
}

export interface IWrapInfoBeatmapAuthors {
   mappers: string[];
   lighters: string[];
}

export interface IWrapInfo<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseItem<T>, IWrapInfoAttribute<T> {
   setFileName(filename: LooseAutocomplete<GenericFileName>): this;

   /** Sort beatmap object(s) accordingly. */
   sort(): this;

   /** Show entries of map inside info. */
   addMap(data: Partial<IWrapInfoDifficultyAttribute>): this;
   listMap(): [CharacteristicName, IWrapInfoDifficulty][];
}

export interface IWrapInfoDifficultyAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseItem<T> {
   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   filename: LooseAutocomplete<GenericFileName>;
   lightshowFilename: LooseAutocomplete<GenericFileName>;
   authors: IWrapInfoBeatmapAuthors;
   njs: number;
   njsOffset: number;
   colorSchemeId: number;
   environmentId: number;
}

export interface IWrapInfoDifficulty<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseItem<T>, IWrapInfoDifficultyAttribute<T> {
   copyColorScheme(colorScheme: IWrapInfoColorScheme): this;
   copyColorScheme(id: number, info: IWrapInfo): this;
}
