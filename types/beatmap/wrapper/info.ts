// deno-lint-ignore-file no-explicit-any
import { LooseAutocomplete } from '../../utils.ts';
import { Version } from '../shared/version.ts';
import { CharacteristicName } from '../shared/characteristic.ts';
import { DifficultyName } from '../shared/difficulty.ts';
import { Environment360Name, EnvironmentName, EnvironmentV3Name } from '../shared/environment.ts';
import { GenericFileName } from '../shared/filename.ts';
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
   readonly difficultySets: { [mode in CharacteristicName]?: IWrapInfoDifficulty[] };
}

export interface IWrapInfo<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoAttribute<T> {
   /** Show entries of map inside info. */
   addMap(data: Partial<IWrapInfoDifficultyAttribute>): this;
   listMap(): [CharacteristicName, IWrapInfoDifficulty][];
}

export interface IWrapInfoDifficultyAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseItem<T> {
   /** Loose string to parent characteristic name, cannot be up-to-date when moved */
   readonly characteristic?: CharacteristicName;
   difficulty: DifficultyName;
   rank: number;
   filename: LooseAutocomplete<GenericFileName>;
   njs: number;
   njsOffset: number;
}

export interface IWrapInfoDifficulty<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoDifficultyAttribute<T> {}
