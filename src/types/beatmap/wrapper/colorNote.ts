import type { IWrapBaseNote } from './baseNote.ts';
import type { ICustomDataNote } from './custom/note.ts';

/**
 * Wrapper attribute for beatmap color note.
 */
export interface IWrapColorNote extends IWrapBaseNote {
   /**
    * Angle offset in degree counter-clockwise of note.
    *
    * **Type:** `i32`
    */
   angleOffset: number;
   customData: ICustomDataNote;
}
