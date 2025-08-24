import type { IWrapBaseNote } from './baseNote.ts';
import type { ICustomDataNote } from './custom/note.ts';

/**
 * Wrapper attribute for beatmap bomb note.
 */
export interface IWrapBombNote extends IWrapBaseNote {
   customData: ICustomDataNote;
}
