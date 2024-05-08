// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseNote, IWrapBaseNoteAttribute } from './baseNote.ts';
import type { ICustomDataNote } from './custom/note.ts';

export interface IWrapBombNoteAttribute extends IWrapBaseNoteAttribute {
   customData: ICustomDataNote;
}

export interface IWrapBombNote<
   T extends Record<string, any> = IWrapBombNoteAttribute,
> extends Omit<IWrapBaseNote<T>, 'customData'>, IWrapBombNoteAttribute {
   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;
}
