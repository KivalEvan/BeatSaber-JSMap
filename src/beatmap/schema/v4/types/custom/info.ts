import type { LooseAutocomplete } from '../../../../../types/utils.ts';
import type { CharacteristicName } from '../../../shared/types/characteristic.ts';
import type { IContributor } from '../../../shared/types/custom/contributor.ts';
import type { ICustomDataBase } from '../../../shared/types/custom/customData.ts';
import type { ModRequirements, ModSuggestions } from '../../../shared/types/modCheck.ts';
import type { IChromaInfoCustomData } from '../../../v2/types/custom/chroma.ts';
import type { IColorScheme } from '../../../v2/types/custom/colorScheme.ts';
import type { IEditor } from '../../../v2/types/custom/editor.ts';
import type {
   IHeckInfoCustomData,
   IInfoSettingsCustomData,
} from '../../../v2/types/custom/heck.ts';

/**
 * Custom data schema for v4 info.
 */
export interface ICustomDataInfo extends ICustomDataBase {
   _editors?: IEditor;
   _contributors?: IContributor[];
   _customEnvironment?: string;
   _customEnvironmentHash?: string;
   _characteristics?: ICustomCharacteristic[];
}

export interface ICustomCharacteristic {
   characteristic: CharacteristicName;
   label: string;
   iconPath?: string;
}

type IInfoSettings =
   & IInfoSettingsCustomData
   & IHeckInfoCustomData
   & IChromaInfoCustomData;

/**
 * Custom data schema for v4 info beatmap.
 */
export interface ICustomDataInfoBeatmap extends ICustomDataBase, IColorScheme, IInfoSettings {
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
