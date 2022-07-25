import { IBookmark } from './bookmark.ts';
import { IBPMChange, IBPMChangeOld } from '../shared/bpm.ts';
import { IChromaCustomData, IChromaNote, IChromaObstacle } from './chroma.ts';
import { INENote, INEObstacle } from './noodleExtensions.ts';
import { ICustomDataBase } from '../shared/customData.ts';
import { IPointDefinition } from './pointDefinition.ts';
import { ICustomEvent } from './customEvent.ts';
import { IAnimation } from './animation.ts';

/** Custom Data interface for difficulty file.
 * @extends ICustomDataBase
 * @extends IChromaCustomData
 */
export interface ICustomDataDifficulty extends ICustomDataBase, IChromaCustomData {
    _customEvents?: ICustomEvent[];
    _pointDefinitions?: IPointDefinition[];
    _time?: number;
    _bpmChanges?: IBPMChangeOld[];
    _BPMChanges?: IBPMChange[];
    _bookmarks?: IBookmark[];
}

export type ICustomDataNote = ICustomDataBase & IChromaNote & INENote & IAnimation;
export type ICustomDataObstacle = ICustomDataBase & IChromaObstacle & INEObstacle & IAnimation;
