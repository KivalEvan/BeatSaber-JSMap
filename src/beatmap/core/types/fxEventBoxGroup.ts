import type { IWrapEventBoxGroup } from './eventBoxGroup.ts';
import type { IWrapFxEventBox } from './fxEventBox.ts';

/**
 * Wrapper attribute for beatmap fx event box group.
 */
export interface IWrapFxEventBoxGroup extends IWrapEventBoxGroup {
   boxes: IWrapFxEventBox[];
}
