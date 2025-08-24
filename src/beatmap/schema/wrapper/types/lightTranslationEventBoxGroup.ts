import type { IWrapEventBoxGroup } from './eventBoxGroup.ts';
import type { IWrapLightTranslationEventBox } from './lightTranslationEventBox.ts';

/**
 * Wrapper attribute for beatmap light translation event box group.
 */
export interface IWrapLightTranslationEventBoxGroup extends IWrapEventBoxGroup {
   boxes: IWrapLightTranslationEventBox[];
}
