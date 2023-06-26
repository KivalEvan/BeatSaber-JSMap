// deno-lint-ignore-file no-explicit-any
import { LooseAutocomplete } from '../../utils.ts';
import { Version } from '../shared/version.ts';
import { CharacteristicName } from '../shared/characteristic.ts';
import { DifficultyName } from '../shared/difficulty.ts';
import { Environment360Name, EnvironmentName, EnvironmentV3Name } from '../shared/environment.ts';
import { GenericFileName } from '../shared/fileName.ts';
import { IWrapBaseItem } from './baseItem.ts';

export interface IWrapInfoAttribute<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T> {
   version: Version;
   songName: string;
   songSubName: string;
   songAuthorName: string;
   levelAuthorName: string;
   beatsPerMinute: number;
   shuffle: number;
   shufflePeriod: number;
   previewStartTime: number;
   previewDuration: number;
   songFilename: string;
   coverImageFilename: string;
   environmentName: EnvironmentName | EnvironmentV3Name;
   allDirectionsEnvironmentName: Environment360Name;
   songTimeOffset: number;
   difficultySets: { [mode in CharacteristicName]?: IWrapInfoBeatmap[] };
}

export interface IWrapInfo<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoAttribute<T> {}

export interface IWrapInfoBeatmapAttribute<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T> {
   difficulty: DifficultyName;
   rank: number;
   filename: LooseAutocomplete<GenericFileName>;
   njs: number;
   njsOffset: number;
}

export interface IWrapInfoBeatmap<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoBeatmapAttribute<T> {}
