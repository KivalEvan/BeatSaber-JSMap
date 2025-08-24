import type { IBookmark } from './bookmark.ts';
import type { IBPMChange, IBPMChangeOld } from './bpmChange.ts';
import type { IChromaCustomData } from './chroma.ts';
import type { ICustomDataBase } from '../../../shared/types/custom/customData.ts';
import type { IPointDefinition } from './pointDefinition.ts';
import type { ICustomEvent } from './customEvent.ts';

/**
 * Custom data interface for difficulty file.
 */
export interface ICustomDataDifficulty extends ICustomDataBase, IChromaCustomData {
   /**
    * Time spent in editor.
    *
    * **Type:** `f32`
    */
   _time?: number;
   _customEvents?: ICustomEvent[];
   _pointDefinitions?: IPointDefinition[];
   _bpmChanges?: IBPMChangeOld[];
   _BPMChanges?: IBPMChange[];
   _bookmarks?: IBookmark[];
}
