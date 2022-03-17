import { IBookmark } from './bookmark.ts';
import { IBPMChange, IBPMChangeOld } from '../shared/bpm.ts';
import { IHeckCustomData, IHeckCustomEvent } from './heck.ts';
import {
    IChromaCustomData,
    IChromaCustomEvent,
    IChromaNote,
    IChromaObstacle,
} from './chroma.ts';
import {
    INECustomData,
    INECustomEvent,
    INENote,
    INEObstacle,
} from './noodleExtensions.ts';

/** Base custom data interface. */
export interface CustomData {
    // deno-lint-ignore no-explicit-any
    [key: string]: any;
}

export type ICustomEvent = IHeckCustomEvent | IChromaCustomEvent | INECustomEvent;

/** Custom Data interface for difficulty file.
 * ```ts
 * _time?: float,
 * _bpmChanges?: BPMChange[];
 * _BPMChanges?: BPMChange[];
 * _bookmarks?: Bookmark[];
 * ```
 * @extends CustomData
 * @extends CCustomData
 * @extends INECustomData
 */
export interface ICustomDataDifficulty
    extends CustomData,
        Omit<IHeckCustomData, '_customEvents'>,
        Omit<IChromaCustomData, '_customEvents'>,
        Omit<INECustomData, '_customEvents'> {
    _customEvents?: ICustomEvent[];
    _time?: number;
    _bpmChanges?: IBPMChangeOld[];
    _BPMChanges?: IBPMChange[];
    _bookmarks?: IBookmark[];
}

export type ICustomDataNote = CustomData & IChromaNote & INENote;
export type ICustomDataObstacle = CustomData & IChromaObstacle & INEObstacle;
