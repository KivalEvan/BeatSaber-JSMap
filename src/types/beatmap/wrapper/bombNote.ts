import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';
import type { ICustomDataNote } from './custom/note.ts';

/**
 * Wrapper attribute for beatmap bomb note.
 */
export interface IWrapBombNoteAttribute extends IWrapBaseNoteAttribute {
   customData: ICustomDataNote;
}

/**
 * Wrapper for beatmap bomb note.
 */
export interface IWrapBombNote extends Omit<IWrapBaseNote, 'customData'>, IWrapBombNoteAttribute {
   setCustomData(object: this['customData']): this;
   addCustomData(object: this['customData']): this;
}
