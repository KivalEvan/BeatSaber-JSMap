import { IWrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';

// deno-lint-ignore no-empty-interface
export interface IWrapLightTranslationEventBoxGroup<
    TGroup extends Record<keyof TGroup, unknown> = Record<string, unknown>,
    TBox extends Record<keyof TBox, unknown> = Record<string, unknown>,
    TBase extends Record<keyof TBase, unknown> = Record<string, unknown>,
    TFilter extends Record<keyof TFilter, unknown> = Record<string, unknown>
> extends IWrapEventBoxGroupTemplate<TGroup, TBox, TBase, TFilter> {}
