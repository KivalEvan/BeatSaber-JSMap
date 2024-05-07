// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';
import type { ICustomDataNote } from './custom/note.ts';

export interface IWrapColorNoteAttribute extends IWrapBaseNoteAttribute {
   /** Angle offset in degree counter-clockwise `<int>` of note.*/
   angleOffset: number;
   customData: ICustomDataNote;
}

export interface IWrapColorNote<
   T extends Record<string, any> = IWrapColorNoteAttribute,
> extends Omit<IWrapBaseNote<T>, 'customData'>, IWrapColorNoteAttribute {
   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;

   setAngleOffset(value: number): this;
}
