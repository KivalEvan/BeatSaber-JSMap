import { IContributor } from './contributor.ts';
import { IEditor } from './editor.ts';
import { IColorScheme } from '../colorScheme.ts';
import { IHeckInfoCustomData, IInfoSettingsCustomData } from './heck.ts';
import { IChromaInfoCustomData } from './chroma.ts';
import { LooseAutocomplete } from '../../../utils.ts';

/** Base custom data interface. */
export interface ICustomDataBase {
   // deno-lint-ignore no-explicit-any
   [key: string]: any;
}

/**
 * Custom Data interface for info.
 * @extends ICustomDataBase
 */
export interface ICustomDataInfo extends ICustomDataBase {
   _editors?: IEditor;
   _contributors?: IContributor[];
   _customEnvironment?: string;
   _customEnvironmentHash?: string;
}

/** Available mod suggestions. */
export type Suggestions = 'Chroma' | 'Cinema';

/** Available mod requirements. */
export type Requirements = Suggestions | 'Noodle Extensions' | 'Mapping Extensions';

type IInfoSettings = IInfoSettingsCustomData & IHeckInfoCustomData & IChromaInfoCustomData;
/**
 * Custom Data interface for info difficulty.
 * @extends ICustomDataBase
 * @extends IColorScheme
 * @extends IInfoSettings
 */
export interface ICustomDataInfoDifficulty extends ICustomDataBase, IColorScheme, IInfoSettings {
   _difficultyLabel?: string;
   _editorOffset?: number;
   _editorOldOffset?: number;
   _warnings?: string[];
   _information?: string[];
   _suggestions?: LooseAutocomplete<Suggestions>[];
   _requirements?: LooseAutocomplete<Requirements>[];
}
