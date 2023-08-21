// deno-lint-ignore-file no-explicit-any
import { LooseAutocomplete } from '../../utils.ts';
import { Version } from '../shared/version.ts';
import { CharacteristicName } from '../shared/characteristic.ts';
import { DifficultyName } from '../shared/difficulty.ts';
import {
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
} from '../shared/environment.ts';
import { GenericFileName } from '../shared/filename.ts';
import { IWrapBaseItem } from './baseItem.ts';
import { IColor } from '../../colors.ts';

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
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   songTimeOffset: number;
   readonly difficultySets: IWrapInfoSet[];
}

export interface IWrapInfoColorScheme {
   useOverride: boolean;
   colorScheme: IWrapInfoColorSchemeData;
}

export interface IWrapInfoColorSchemeData {
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

export interface IWrapInfo<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoAttribute<T> {
   /** Show entries of map inside info. */
   addMap(data: Partial<IWrapInfoDifficultyAttribute>): this;
   listMap(): [CharacteristicName, IWrapInfoDifficulty][];
}

export interface IWrapInfoSetAttribute<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T> {
   characteristic: CharacteristicName;
   difficulties: IWrapInfoDifficulty[];
}

export interface IWrapInfoSet<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoSetAttribute<T> {}

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
   colorSchemeId: number;
   environmentId: number;
}

export interface IWrapInfoDifficulty<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseItem<T>, IWrapInfoDifficultyAttribute<T> {
   copyColorScheme(colorScheme: IWrapInfoColorSchemeData): this;
   copyColorScheme(id: number, info: IWrapInfo): this;
}
