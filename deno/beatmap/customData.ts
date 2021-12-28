import { Bookmark } from './bookmark.ts';
import { BPMChange } from './bpm.ts';
import {
    CCustomData,
    ChromaEnvironmentOld,
    ChromaEvent,
    ChromaNote,
    ChromaObstacle,
} from './chroma.ts';
import { Contributor } from './contributor.ts';
import { Editor } from './editor.ts';
import { ColorScheme } from './environment.ts';
import { NECustomData, NEEvent, NENote, NEObstacle } from './noodleExtensions.ts';

export interface CustomData {}

export interface CustomDataInfo extends CustomData {
    _editors?: Editor;
    _contributors?: Contributor[];
    _customEnvironment?: string;
    _customEnvironmentHash?: string;
}

export interface CustomDataInfoDifficulty
    extends CustomData,
        ColorScheme,
        ChromaEnvironmentOld {
    _difficultyLabel?: string;
    _editorOffset?: number;
    _editorOldOffset?: number;
    _warnings?: string[];
    _information?: string[];
    _suggestions?: string[];
    _requirements?: string[];
}

export interface CustomDataDifficulty extends CustomData, CCustomData, NECustomData {
    _time?: number;
    _bpmChanges?: BPMChange[];
    _BPMChanges?: BPMChange[];
    _bookmarks?: Bookmark[];
}

export type CustomDataNote = CustomData & ChromaNote & NENote;
export type CustomDataObstacle = CustomData & ChromaObstacle & NEObstacle;
export type CustomDataEvent = CustomData & ChromaEvent & NEEvent;
