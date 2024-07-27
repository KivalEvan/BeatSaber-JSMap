import type { LooseAutocomplete } from '../../utils.ts';
import type { CharacteristicName } from '../shared/characteristic.ts';
import type { DifficultyName } from '../shared/difficulty.ts';
import type {
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
} from '../shared/environment.ts';
import type { IColor } from '../../colors.ts';
import type { ICustomDataInfo } from './custom/info.ts';
import type { ICustomDataInfoBeatmap } from '../v4/custom/info.ts';
import type { IWrapBaseFileAttribute, IWrapBeatmapFile } from './baseFile.ts';
import type { GenericFilename } from '../shared/filename.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap info.
 */
export interface IWrapInfoAttribute extends IWrapBaseItemAttribute, IWrapBaseFileAttribute {
   song: IWrapInfoSong;
   audio: IWrapInfoAudio;
   songPreviewFilename: string;
   coverImageFilename: string;
   /**
    * @deprecated use for pre-v4
    */
   environmentBase: {
      normal: EnvironmentName | EnvironmentV3Name | null;
      allDirections: Environment360Name | null;
   };
   environmentNames: EnvironmentAllName[];
   colorSchemes: IWrapInfoColorScheme[];
   difficulties: IWrapInfoBeatmapAttribute[];
   customData: ICustomDataInfo;
}

/**
 * Wrapper interface for beatmap info song.
 */
export interface IWrapInfoSong {
   title: string;
   subTitle: string;
   author: string;
}

/**
 * Wrapper interface for beatmap info audio.
 */
export interface IWrapInfoAudio {
   filename: string;
   duration: number; // float
   audioDataFilename: string;
   bpm: number; // float
   lufs: number; // float
   previewStartTime: number; // float
   previewDuration: number; // float
   /**
    * Exist for backport compatibility.
    *
    * Highly recommended to not use offset as it causes audio syncing issue.
    *
    * @deprecated
    */
   audioOffset: number;
   /**
    * Exist for backport compatibility.
    *
    * @deprecated
    */
   shuffle: number;
   /**
    * Exist for backport compatibility.
    *
    * @deprecated
    */
   shufflePeriod: number;
}

/**
 * Wrapper interface for beatmap info color scheme.
 */
export interface IWrapInfoColorScheme {
   /**
    * @deprecated for use in v2 info only
    * @default true
    */
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

/**
 * Wrapper interface for beatmap info beatmap authors.
 */
export interface IWrapInfoBeatmapAuthors {
   mappers: string[];
   lighters: string[];
}

/**
 * Wrapper interface for beatmap info.
 */
export interface IWrapInfo extends Omit<IWrapBeatmapFile, 'customData'>, IWrapInfoAttribute {
   difficulties: IWrapInfoBeatmap[];

   setCustomData(object: this['customData']): this;
   addCustomData(object: this['customData']): this;

   /** Sort beatmap object(s) accordingly. */
   sort(): this;

   addMap(data: Partial<IWrapInfoBeatmapAttribute>): this;
}

/**
 * Wrapper attribute for beatmap info beatmap.
 */
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

/**
 * Wrapper interface for beatmap info beatmap.
 */
export interface IWrapInfoBeatmap
   extends Omit<IWrapBaseItem, 'customData'>, IWrapInfoBeatmapAttribute {
   setCustomData(object: this['customData']): this;
   addCustomData(object: this['customData']): this;
}
