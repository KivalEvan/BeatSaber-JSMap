import { WrapEventBoxGroup } from './eventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroup } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IWrapLightRotationEventBox } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';

/** Light rotation event box group beatmap class object. */
export abstract class WrapLightRotationEventBoxGroup<
    TGroup extends Record<keyof TGroup, unknown>,
    TBox extends Record<keyof TBox, unknown>,
    TBase extends Record<keyof TBase, unknown>,
    TFilter extends Record<keyof TFilter, unknown>,
> extends WrapEventBoxGroup<TGroup, TBox, TBase, TFilter>
    implements IWrapLightRotationEventBoxGroup<TGroup, TBox, TBase, TFilter> {
    abstract get boxes(): IWrapLightRotationEventBox<TBox, TBase, TFilter>[];
    abstract set boxes(value: IWrapLightRotationEventBox<TBox, TBase, TFilter>[]);
}
