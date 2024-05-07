// deno-lint-ignore-file no-explicit-any
import type { LooseAutocomplete } from '../../utils.ts';
import type { CharacteristicName } from '../shared/characteristic.ts';
import type { DifficultyName } from '../shared/difficulty.ts';
import type { EnvironmentAllName } from '../shared/environment.ts';
import type { GenericFilename, IFileInfo } from '../shared/filename.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';
import type { IColor } from '../../colors.ts';
import type { ICustomDataInfo } from './custom/info.ts';
import type { ICustomDataInfoBeatmap } from '../v4/custom/info.ts';

export interface IWrapInfoAttribute extends IWrapBaseItemAttribute, IFileInfo {
   song: IWrapInfoSong;
   audio: IWrapInfoAudio;
   songPreviewFilename: string;
   coverImageFilename: string;
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   difficulties: IWrapInfoBeatmapAttribute[];
   customData: ICustomDataInfo;
}

export interface IWrapInfoSong {
   title: string;
   subTitle: string;
   author: string;
}

export interface IWrapInfoAudio {
   filename: string;
   duration: number; // float
   audioDataFilename: string;
   bpm: number; // float
   lufs: number; // float
   previewStartTime: number; // float
   previewDuration: number; // float
}

export interface IWrapInfoColorScheme {
   /**
    * For use in v2 info, true by default.
    */
   useOverride?: boolean;
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

export interface IWrapInfo<T extends Record<string, any> = IWrapInfoAttribute>
   extends Omit<IWrapBaseItem<T>, 'customData'>, IWrapInfoAttribute {
   difficulties: IWrapInfoBeatmap[];
   setFilename(filename: LooseAutocomplete<GenericFilename>): this;

   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   /** Sort beatmap object(s) accordingly. */
   sort(): this;

   addMap(data: Partial<IWrapInfoBeatmapAttribute>): this;
}

export interface IWrapInfoBeatmapAttribute extends IWrapBaseItemAttribute {
   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   filename: LooseAutocomplete<GenericFilename>;
   lightshowFilename: LooseAutocomplete<GenericFilename>;
   authors: IWrapInfoBeatmapAuthors;
   njs: number;
   njsOffset: number;
   colorSchemeId: number;
   environmentId: number;
   customData: ICustomDataInfoBeatmap;
}

export interface IWrapInfoBeatmap<T extends Record<string, any> = IWrapInfoBeatmapAttribute>
   extends Omit<IWrapBaseItem<T>, 'customData'>, IWrapInfoBeatmapAttribute {
   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   copyColorScheme(colorScheme: IWrapInfoColorScheme): this;
   copyColorScheme(id: number, info: IWrapInfo): this;
}
