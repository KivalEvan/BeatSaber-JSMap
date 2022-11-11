import { IWrapEventBox } from '../../types/beatmap/wrapper/eventBox.ts';
import { IWrapEventBoxGroupTemplate } from '../../types/beatmap/wrapper/eventBoxGroupTemplate.ts';
import { WrapEventBoxGroup } from './eventBoxGroup.ts';

/** Base event box group template beatmap class object. */
export abstract class WrapEventBoxGroupTemplate<
    TGroup extends Record<keyof TGroup, unknown>,
    TBox extends Record<keyof TBox, unknown>,
    TBase extends Record<keyof TBase, unknown>,
    TFilter extends Record<keyof TFilter, unknown>,
> extends WrapEventBoxGroup<TGroup> implements IWrapEventBoxGroupTemplate<TGroup, TBox, TBase, TFilter> {
    abstract get events(): IWrapEventBox<TBox, TBase, TFilter>[];
    abstract set events(value: IWrapEventBox<TBox, TBase, TFilter>[]);
}
