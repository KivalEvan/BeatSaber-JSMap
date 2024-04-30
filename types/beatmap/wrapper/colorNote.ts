// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';

export interface IWrapColorNoteAttribute extends IWrapBaseNoteAttribute {
   /** Angle offset in degree counter-clockwise `<int>` of note.*/
   angleOffset: number;
}

export interface IWrapColorNote<
   T extends Record<string, any> = IWrapColorNoteAttribute,
> extends IWrapBaseNote<T>, IWrapColorNoteAttribute {
   setAngleOffset(value: number): this;
}
