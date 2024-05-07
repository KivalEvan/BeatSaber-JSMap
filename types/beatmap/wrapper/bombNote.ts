// deno-lint-ignore-file no-explicit-any
import type { ICustomDataNote } from './custom/note.ts';
import type { IWrapGridObject, IWrapGridObjectAttribute } from './gridObject.ts';

export interface IWrapBombNoteAttribute extends IWrapGridObjectAttribute {
   customData: ICustomDataNote;
}

export interface IWrapBombNote<
   T extends Record<string, any> = IWrapBombNoteAttribute,
> extends Omit<IWrapGridObject<T>, 'customData'>, IWrapBombNoteAttribute {
   setCustomData(object: T['customData']): this;
   addCustomData(object: T['customData']): this;
}
