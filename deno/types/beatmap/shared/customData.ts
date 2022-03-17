import { IContributor } from './contributor.ts';
import { IEditor } from './editor.ts';
import { IColorScheme } from './environment.ts';
import { IHeckInfoCustomData } from './heck.ts';
import { IChromaEnvironmentOld } from './chroma.ts';

/** Base custom data interface. */
export interface ICustomData {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

/** Custom Data interface for info.
 * ```ts
 * _editors?: Editor,
 * _contributors?: Contributor[],
 * _customEnvironment?: string,
 * _customEnvironmentHash?: string
 * ```
 * @extends ICustomData
 */
export interface ICustomDataInfo extends ICustomData {
    _editors?: IEditor;
    _contributors?: IContributor[];
    _customEnvironment?: string;
    _customEnvironmentHash?: string;
}

/** Custom Data interface for info difficulty.
 * ```ts
 * _difficultyLabel?: string,
 * _editorOffset?: int,
 * _editorOldOffset?: int,
 * _warnings?: string[],
 * _information?: string[],
 * _suggestions?: string[],
 * _requirements?: string[]
 * ```
 * @extends ICustomData
 * @extends IColorScheme
 * @extends IHeckInfoCustomData
 * @extends IChromaEnvironmentOld
 */
export interface ICustomDataInfoDifficulty
    extends ICustomData,
        IColorScheme,
        IHeckInfoCustomData,
        IChromaEnvironmentOld {
    _difficultyLabel?: string;
    _editorOffset?: number;
    _editorOldOffset?: number;
    _warnings?: string[];
    _information?: string[];
    _suggestions?: string[];
    _requirements?: string[];
}
