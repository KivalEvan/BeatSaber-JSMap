// deno-lint-ignore-file no-explicit-any
import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBox,
   IWrapLightTranslationEventBoxAttribute,
} from './lightTranslationEventBox.ts';

export interface IWrapLightTranslationEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapLightTranslationEventBoxAttribute[];
}

export interface IWrapLightTranslationEventBoxGroup<
   T extends Record<string, any> = IWrapLightTranslationEventBoxGroupAttribute,
> extends IWrapEventBoxGroup<T>, IWrapLightTranslationEventBoxGroupAttribute {
   boxes: IWrapLightTranslationEventBox[];
}
