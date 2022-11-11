import { WrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { IWrapLightRotationEventBoxGroup } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';

/** Light rotation event box group beatmap class object. */
export abstract class WrapLightRotationEventBoxGroup<
    TGroup extends Record<keyof TGroup, unknown>,
    TBox extends Record<keyof TBox, unknown>,
    TBase extends Record<keyof TBase, unknown>,
    TFilter extends Record<keyof TFilter, unknown>,
> extends WrapEventBoxGroupTemplate<TGroup, TBox, TBase, TFilter>
    implements IWrapLightRotationEventBoxGroup<TGroup, TBox, TBase, TFilter> {}
