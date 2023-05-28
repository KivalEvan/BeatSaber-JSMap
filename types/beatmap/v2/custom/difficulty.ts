import { IBookmark } from './bookmark.ts';
import { IBPMChange, IBPMChangeOld } from './bpmChange.ts';
import { IChromaCustomData } from './chroma.ts';
import { ICustomDataBase } from '../../shared/custom/customData.ts';
import { IPointDefinition } from './pointDefinition.ts';
import { ICustomEvent } from './customEvent.ts';

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
