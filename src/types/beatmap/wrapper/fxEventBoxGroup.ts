import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type { IWrapFxEventBox, IWrapFxEventBoxAttribute } from './fxEventBox.ts';

/**
 * Wrapper attribute for beatmap fx event box group.
 */
export interface IWrapFxEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapFxEventBoxAttribute[];
}

/**
 * Wrapper for beatmap fx event box group.
 */
export interface IWrapFxEventBoxGroup extends IWrapEventBoxGroup, IWrapFxEventBoxGroupAttribute {
   boxes: IWrapFxEventBox[];
}
