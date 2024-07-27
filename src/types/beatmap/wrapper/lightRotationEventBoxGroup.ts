import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightRotationEventBox,
   IWrapLightRotationEventBoxAttribute,
} from './lightRotationEventBox.ts';

/**
 * Wrapper attribute for beatmap light rotation event box group.
 */
export interface IWrapLightRotationEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapLightRotationEventBoxAttribute[];
}

/**
 * Wrapper for beatmap light rotation event box group.
 */
export interface IWrapLightRotationEventBoxGroup
   extends IWrapEventBoxGroup, IWrapLightRotationEventBoxGroupAttribute {
   boxes: IWrapLightRotationEventBox[];
}
