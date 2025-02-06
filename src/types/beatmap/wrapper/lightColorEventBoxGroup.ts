import type { IWrapEventBoxGroup } from './eventBoxGroup.ts';
import type { IWrapLightColorEventBox } from './lightColorEventBox.ts';

/**
 * Wrapper attribute for beatmap light color event box group.
 */
export interface IWrapLightColorEventBoxGroup extends IWrapEventBoxGroup {
   boxes: IWrapLightColorEventBox[];
}
