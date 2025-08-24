import type { IBookmark } from '../../../v2/types/custom/bookmark.ts';
import type { IBPMChangeOld } from '../../../v2/types/custom/bpmChange.ts';

/**
 * Custom data schema for v1 difficulty.
 */
export interface ICustomDifficulty {
   /**
    * Time spent in editor.
    *
    * **Type:** `f32`
    */
   _time?: number;
   _BPMChanges?: IBPMChangeOld[];
   _bookmarks?: Omit<IBookmark, '_color'>[];
}
