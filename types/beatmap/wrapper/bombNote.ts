// deno-lint-ignore-file no-explicit-any
import type { IWrapGridObject, IWrapGridObjectAttribute } from './gridObject.ts';

export interface IWrapBombNoteAttribute extends IWrapGridObjectAttribute {}

export interface IWrapBombNote<
   T extends Record<string, any> = IWrapBombNoteAttribute,
> extends IWrapGridObject<T>, IWrapBombNoteAttribute {}
