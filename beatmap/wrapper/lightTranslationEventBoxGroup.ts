import { WrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { IWrapLightTranslationEventBoxGroup } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { IWrapLightTranslationEventBox } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';

/** Light translation event box group beatmap class object. */
export abstract class WrapLightTranslationEventBoxGroup<
    T extends Record<keyof T, unknown>,
> extends WrapEventBoxGroupTemplate<T> implements IWrapLightTranslationEventBoxGroup {
    abstract get events(): IWrapLightTranslationEventBox[];
    abstract set events(value: IWrapLightTranslationEventBox[]);
}
