import { IWrapGridObject, IWrapGridObjectAttribute } from './gridObject.ts';

// deno-lint-ignore no-empty-interface
export interface IWrapBombNoteAttribute<
    T extends Record<keyof T, unknown> = Record<string, unknown>,
> extends IWrapGridObjectAttribute<T> {}

export interface IWrapBombNote<T extends Record<keyof T, unknown> = Record<string, unknown>>
    extends IWrapGridObject<T>, IWrapBombNoteAttribute<T> {}
