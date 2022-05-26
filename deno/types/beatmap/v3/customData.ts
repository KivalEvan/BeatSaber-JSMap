import { IBookmark } from '../shared/bookmark.ts';
import { IBPMChange } from '../shared/bpm.ts';
import { IHeckCustomData } from './heck.ts';
import { IChromaCustomData, IChromaNote, IChromaObstacle } from './chroma.ts';
import { INENote, INEObstacle } from './noodleExtensions.ts';
import { ICustomEvent } from './customEvent.ts';
import { ICustomDataBase } from '../shared/customData.ts';

/** Custom Data interface for difficulty file.
 * @extends CustomData
 * @extends CCustomData
 * @extends INECustomData
 */
export interface ICustomDataDifficulty extends ICustomDataBase, IHeckCustomData, IChromaCustomData {
    customEvents?: ICustomEvent[];
    time?: number;
    BPMChanges?: IBPMChange[];
    bookmarks?: IBookmark[];
}

export type ICustomDataNote = ICustomDataBase & IChromaNote & INENote;
export type ICustomDataObstacle = ICustomDataBase & IChromaObstacle & INEObstacle;
