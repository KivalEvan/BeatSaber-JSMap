import type { IWrapBasicEventBoxGroup, IWrapBasicEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type { IWrapFxEventBox, IWrapFxEventBoxAttribute } from './fxEventBox.ts';

export interface IWrapFxEventBoxGroupAttribute extends IWrapBasicEventBoxGroupAttribute {
   boxes: IWrapFxEventBoxAttribute[];
}

export interface IWrapFxEventBoxGroup
   extends IWrapBasicEventBoxGroup, IWrapFxEventBoxGroupAttribute {
   boxes: IWrapFxEventBox[];
}
