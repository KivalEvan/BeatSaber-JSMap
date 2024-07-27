import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';
import type { ICustomDataNote } from './custom/note.ts';

/**
 * Wrapper attribute for beatmap color note.
 */
export interface IWrapColorNoteAttribute extends IWrapBaseNoteAttribute {
   /**
    * Angle offset in degree counter-clockwise of note.
    *
    * **Type:** `i32`
    */
   angleOffset: number;
   customData: ICustomDataNote;
}

/**
 * Wrapper for beatmap color note.
 */
export interface IWrapColorNote extends Omit<IWrapBaseNote, 'customData'>, IWrapColorNoteAttribute {
   setCustomData(object: this['customData']): this;
   addCustomData(object: this['customData']): this;

   setAngleOffset(value: number): this;
}
