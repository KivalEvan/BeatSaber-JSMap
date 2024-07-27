import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightColorEventBox,
   IWrapLightColorEventBoxAttribute,
} from './lightColorEventBox.ts';

/**
 * Wrapper attribute for beatmap light color event box group.
 */
export interface IWrapLightColorEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapLightColorEventBoxAttribute[];
}

/**
 * Wrapper for beatmap light color event box group.
 */
export interface IWrapLightColorEventBoxGroup
   extends IWrapEventBoxGroup, IWrapLightColorEventBoxGroupAttribute {
   boxes: IWrapLightColorEventBox[];
}
