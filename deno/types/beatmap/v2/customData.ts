import { IBookmark } from '../shared/bookmark.ts';
import { IBPMChange, IBPMChangeOld } from '../shared/bpm.ts';
import { IHeckCustomData, IHeckCustomEvent } from './heck.ts';
import { IChromaCustomData, IChromaCustomEvent, IChromaNote, IChromaObstacle } from './chroma.ts';
import { INECustomData, INECustomEvent, INENote, INEObstacle } from './noodleExtensions.ts';
import { ICustomDataBase } from '../shared/customData.ts';

export type ICustomEvent = IHeckCustomEvent | IChromaCustomEvent | INECustomEvent;

/** Custom Data interface for difficulty file.
 * @extends CustomData
 * @extends CCustomData
 * @extends INECustomData
 */
export interface ICustomDataDifficulty
    extends
        ICustomDataBase,
        Omit<IHeckCustomData, '_customEvents'>,
        Omit<IChromaCustomData, '_customEvents'>,
        Omit<INECustomData, '_customEvents'> {
    _customEvents?: ICustomEvent[];
    _time?: number;
    _bpmChanges?: IBPMChangeOld[];
    _BPMChanges?: IBPMChange[];
    _bookmarks?: IBookmark[];
}

export type ICustomDataNote = ICustomDataBase & IChromaNote & INENote;
export type ICustomDataObstacle = ICustomDataBase & IChromaObstacle & INEObstacle;
