import { IBookmark } from './bookmark.ts';
import { IBPMChange } from './bpmChange.ts';
import { IHeckCustomData } from './heck.ts';
import { IChromaCustomData } from './chroma.ts';
import { ICustomEvent } from './customEvent.ts';
import { ICustomDataBase } from '../../shared/custom/customData.ts';
import { IPointDefinition } from './pointDefinition.ts';
import { IColorNote } from '../colorNote.ts';
import { IChain } from '../chain.ts';
import { IBombNote } from '../bombNote.ts';
import { IObstacle } from '../obstacle.ts';

/** Custom Data interface for difficulty file.
 * @extends ICustomDataBase
 * @extends IHeckCustomData
 * @extends IChromaCustomData
 */
export interface ICustomDataDifficulty extends ICustomDataBase, IHeckCustomData, IChromaCustomData {
   fakeColorNotes?: IColorNote[];
   fakeBurstSliders?: IChain[];
   fakeBombNotes?: IBombNote[];
   fakeObstacles?: IObstacle[];
   customEvents?: ICustomEvent[];
   pointDefinitions?: IPointDefinition;
   time?: number;
   BPMChanges?: IBPMChange[];
   bookmarks?: IBookmark[];
}
