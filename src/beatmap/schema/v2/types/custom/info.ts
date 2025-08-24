import type { IContributor } from '../../../shared/types/custom/contributor.ts';
import type { IEditor } from './editor.ts';
import type { IColorScheme } from './colorScheme.ts';
import type { IHeckInfoCustomData, IInfoSettingsCustomData } from './heck.ts';
import type { IChromaInfoCustomData } from './chroma.ts';
import type { LooseAutocomplete } from '../../../../../types/utils.ts';
import type { ICustomDataBase } from '../../../shared/types/custom/customData.ts';
import type { ModRequirements, ModSuggestions } from '../../../shared/types/modCheck.ts';
import type { IVivifyCustomDataInfo } from './vivify.ts';

/**
 * Custom Data interface for info.
 */
export interface ICustomDataInfo extends ICustomDataBase, IVivifyCustomDataInfo {
   _editors?: IEditor;
   _contributors?: IContributor[];
   _customEnvironment?: string;
   _customEnvironmentHash?: string;
}

/**
 * Custom Data interface for info set.
 */
export interface ICustomDataInfoSet extends ICustomDataBase {
   _characteristicLabel?: string;
   _characteristicIconImageFilename?: string;
}

type IInfoSettings =
   & IInfoSettingsCustomData
   & IHeckInfoCustomData
   & IChromaInfoCustomData;

/**
 * Custom Data interface for info difficulty.
 */
export interface ICustomDataInfoDifficulty extends ICustomDataBase, IColorScheme, IInfoSettings {
   _difficultyLabel?: string;
   _editorOffset?: number;
   _editorOldOffset?: number;
   _warnings?: string[];
   _information?: string[];
   _suggestions?: LooseAutocomplete<ModSuggestions>[];
   _requirements?: LooseAutocomplete<ModRequirements>[];
   _tags?: string[];
   _oneSaber?: boolean;
   _showRotationNoteSpawnLines?: boolean;
}
