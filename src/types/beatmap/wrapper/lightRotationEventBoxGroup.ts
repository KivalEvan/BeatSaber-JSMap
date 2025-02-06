import type { IWrapEventBoxGroup } from './eventBoxGroup.ts';
import type { IWrapLightRotationEventBox } from './lightRotationEventBox.ts';

/**
 * Wrapper attribute for beatmap light rotation event box group.
 */
export interface IWrapLightRotationEventBoxGroup extends IWrapEventBoxGroup {
   boxes: IWrapLightRotationEventBox[];
}
