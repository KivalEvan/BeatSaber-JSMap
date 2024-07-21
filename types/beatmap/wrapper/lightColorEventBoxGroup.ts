import type { IWrapBasicEventBoxGroup, IWrapBasicEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightColorEventBox,
   IWrapLightColorEventBoxAttribute,
} from './lightColorEventBox.ts';

export interface IWrapLightColorEventBoxGroupAttribute extends IWrapBasicEventBoxGroupAttribute {
   boxes: IWrapLightColorEventBoxAttribute[];
}

export interface IWrapLightColorEventBoxGroup
   extends IWrapBasicEventBoxGroup, IWrapLightColorEventBoxGroupAttribute {
   boxes: IWrapLightColorEventBox[];
}
