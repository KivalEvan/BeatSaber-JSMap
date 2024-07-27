import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightTranslationEventBox,
   IWrapLightTranslationEventBoxAttribute,
} from './lightTranslationEventBox.ts';

/**
 * Wrapper attribute for beatmap light translation event box group.
 */
export interface IWrapLightTranslationEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapLightTranslationEventBoxAttribute[];
}

/**
 * Wrapper for beatmap light translation event box group.
 */
export interface IWrapLightTranslationEventBoxGroup
   extends IWrapEventBoxGroup, IWrapLightTranslationEventBoxGroupAttribute {
   boxes: IWrapLightTranslationEventBox[];
}
