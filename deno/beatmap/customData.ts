import { Bookmark } from './bookmark.ts';
import { BPMChange } from './bpm.ts';
import { Contributor } from './contributor.ts';
import { Editor } from './editor.ts';
import { ColorScheme } from './environment.ts';
import { HeckInfoCustomData, HeckCustomData, HeckCustomEvent } from './heck.ts';
import {
    ChromaEnvironmentOld,
    ChromaNote,
    ChromaObstacle,
    ChromaCustomData,
    ChromaCustomEvent,
} from './chroma.ts';
import { NECustomData, NECustomEvent, NENote, NEObstacle } from './noodleExtensions.ts';
import { KeysoundMap, KeysoundNote } from './keysound.ts';

/**
 * Base custom data interface.
 */
export interface CustomData {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

/**
 * Custom Data interface for info.
 *
 *     _editors?: Editor,
 *     _contributors?: Contributor[],
 *     _customEnvironment?: string,
 *     _customEnvironmentHash?: string
 *
 * @extends CustomData
 */
export interface CustomDataInfo extends CustomData, KeysoundMap {
    _editors?: Editor;
    _contributors?: Contributor[];
    _customEnvironment?: string;
    _customEnvironmentHash?: string;
}

/**
 * Custom Data interface for info difficulty.
 *
 *     _difficultyLabel?: string,
 *     _editorOffset?: int,
 *     _editorOldOffset?: int,
 *     _warnings?: string[],
 *     _information?: string[],
 *     _suggestions?: string[],
 *     _requirements?: string[]
 *
 * @extends CustomData
 * @extends ColorScheme
 * @extends HeckInfoCustomData
 * @extends ChromaEnvironmentOld
 */
export interface CustomDataInfoDifficulty
    extends CustomData,
        ColorScheme,
        HeckInfoCustomData,
        ChromaEnvironmentOld {
    _difficultyLabel?: string;
    _editorOffset?: number;
    _editorOldOffset?: number;
    _warnings?: string[];
    _information?: string[];
    _suggestions?: string[];
    _requirements?: string[];
}

/**
 * Custom Data interface for difficulty file.
 *
 *     _time?: float,
 *     _bpmChanges?: BPMChange[];
 *     _BPMChanges?: BPMChange[];
 *     _bookmarks?: Bookmark[];
 *
 * @extends CustomData
 * @extends CCustomData
 * @extends NECustomData
 */

export type CustomEvent = HeckCustomEvent | ChromaCustomEvent | NECustomEvent;

export interface CustomDataDifficulty
    extends CustomData,
        Omit<HeckCustomData, '_customEvents'>,
        Omit<ChromaCustomData, '_customEvents'>,
        Omit<NECustomData, '_customEvents'> {
    _customEvents?: CustomEvent[];
    _time?: number;
    _bpmChanges?: BPMChange[];
    _BPMChanges?: BPMChange[];
    _bookmarks?: Bookmark[];
}

export type CustomDataNote = CustomData & ChromaNote & NENote & KeysoundNote;
export type CustomDataObstacle = CustomData & ChromaObstacle & NEObstacle;
