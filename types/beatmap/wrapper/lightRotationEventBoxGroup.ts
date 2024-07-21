import type { IWrapBasicEventBoxGroup, IWrapBasicEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightRotationEventBox,
   IWrapLightRotationEventBoxAttribute,
} from './lightRotationEventBox.ts';

export interface IWrapLightRotationEventBoxGroupAttribute extends IWrapBasicEventBoxGroupAttribute {
   boxes: IWrapLightRotationEventBoxAttribute[];
}

export interface IWrapLightRotationEventBoxGroup
   extends IWrapBasicEventBoxGroup, IWrapLightRotationEventBoxGroupAttribute {
   boxes: IWrapLightRotationEventBox[];
}
