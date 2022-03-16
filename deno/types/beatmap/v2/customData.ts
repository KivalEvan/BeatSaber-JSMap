import { Bookmark } from './bookmark.ts';
import { BPMChange } from '../shared/bpm.ts';
import { HeckCustomData, HeckCustomEvent } from './heck.ts';
import {
    ChromaCustomData,
    ChromaCustomEvent,
    ChromaNote,
    ChromaObstacle,
} from './chroma.ts';
import { NECustomData, NECustomEvent, NENote, NEObstacle } from './noodleExtensions.ts';

/** Base custom data interface. */
export interface CustomData {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

export type CustomEvent = HeckCustomEvent | ChromaCustomEvent | NECustomEvent;

/** Custom Data interface for difficulty file.
 * ```ts
 * _time?: float,
 * _bpmChanges?: BPMChange[];
 * _BPMChanges?: BPMChange[];
 * _bookmarks?: Bookmark[];
 * ```
 * @extends CustomData
 * @extends CCustomData
 * @extends NECustomData
 */
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

export type CustomDataNote = CustomData & ChromaNote & NENote;
export type CustomDataObstacle = CustomData & ChromaObstacle & NEObstacle;
