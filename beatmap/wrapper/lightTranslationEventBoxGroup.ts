import { WrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { IWrapLightTranslationEventBoxGroup } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';

/** Light translation event box group beatmap class object. */
export abstract class WrapLightTranslationEventBoxGroup<
    TGroup extends Record<keyof TGroup, unknown>,
    TBox extends Record<keyof TBox, unknown>,
    TBase extends Record<keyof TBase, unknown>,
    TFilter extends Record<keyof TFilter, unknown>,
> extends WrapEventBoxGroupTemplate<TGroup, TBox, TBase, TFilter>
    implements IWrapLightTranslationEventBoxGroup<TGroup, TBox, TBase, TFilter> {}
