import type { IBookmark } from './bookmark.ts';
import type { IBPMChange } from './bpmChange.ts';
import type { IHeckCustomData } from './heck.ts';
import type { IChromaCustomData } from './chroma.ts';
import type { ICustomEvent } from './customEvent.ts';
import type { ICustomDataBase } from '../../../shared/types/custom/customData.ts';
import type { IPointDefinition } from './pointDefinition.ts';
import type { IColorNote } from '../colorNote.ts';
import type { IChain } from '../chain.ts';
import type { IBombNote } from '../bombNote.ts';
import type { IObstacle } from '../obstacle.ts';

/**
 * Custom Data interface for difficulty file.
 */
export interface ICustomDataDifficulty extends ICustomDataBase, IHeckCustomData, IChromaCustomData {
   /**
    * Time spent in editor.
    *
    * **Type:** `f32`
    */
   time?: number;
   fakeColorNotes?: IColorNote[];
   fakeBurstSliders?: IChain[];
   fakeBombNotes?: IBombNote[];
   fakeObstacles?: IObstacle[];
   customEvents?: ICustomEvent[];
   pointDefinitions?: IPointDefinition;
   BPMChanges?: IBPMChange[];
   bookmarks?: IBookmark[];
}
