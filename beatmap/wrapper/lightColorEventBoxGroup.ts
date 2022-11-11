import { IWrapLightColorEventBoxGroup } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { WrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';

/** Light color event box group beatmap class object. */
export abstract class WrapLightColorEventBoxGroup<
    TGroup extends Record<keyof TGroup, unknown>,
    TBox extends Record<keyof TBox, unknown>,
    TBase extends Record<keyof TBase, unknown>,
    TFilter extends Record<keyof TFilter, unknown>,
> extends WrapEventBoxGroupTemplate<TGroup, TBox, TBase, TFilter>
    implements IWrapLightColorEventBoxGroup<TGroup, TBox, TBase, TFilter> {}
