import type { LooseAutocomplete } from '../../../../types/utils.ts';
import type { CharacteristicName } from '../../../schema/shared/types/characteristic.ts';
import type { DifficultyName } from '../../../schema/shared/types/difficulty.ts';
import type {
   Environment360Name,
   EnvironmentAllName,
   EnvironmentName,
   EnvironmentV3Name,
} from '../../../schema/shared/types/environment.ts';
import type { IColor } from '../../../../types/colors.ts';
import type { ICustomDataInfo } from './custom/info.ts';
import type { ICustomDataInfoBeatmap } from '../../../schema/v4/types/custom/info.ts';
import type { IWrapBaseFile } from './baseFile.ts';
import type {
   GenericBeatmapFilename,
   GenericInfoFilename,
   GenericLightshowFilename,
} from '../../../schema/shared/types/filename.ts';
import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap info.
 */
export interface IWrapInfo extends IWrapBaseItem, IWrapBaseFile<GenericInfoFilename> {
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
   difficulties: IWrapInfoBeatmap[];
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
   name: string;
   overrideNotes: boolean;
   overrideLights: boolean;
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
 * Wrapper attribute for beatmap info beatmap.
 */
export interface IWrapInfoBeatmap extends IWrapBaseItem {
   characteristic: CharacteristicName;
   difficulty: DifficultyName;
   filename: LooseAutocomplete<GenericBeatmapFilename>;
   lightshowFilename: LooseAutocomplete<GenericLightshowFilename>;
   authors: IWrapInfoBeatmapAuthors;
   njs: number;
   njsOffset: number;
   colorSchemeId: number;
   environmentId: number;
   customData: ICustomDataInfoBeatmap;
}
