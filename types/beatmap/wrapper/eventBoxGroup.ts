import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';
import type { IWrapBasicEventBox, IWrapBasicEventBoxAttribute } from './eventBox.ts';

export interface IWrapBasicEventBoxGroupAttribute extends IWrapBaseObjectAttribute {
   /** Group ID `<int>` of event box group */
   id: number;
   boxes: IWrapBasicEventBoxAttribute[];
}

export interface IWrapBasicEventBoxGroup extends IWrapBaseObject, IWrapBasicEventBoxGroupAttribute {
   boxes: IWrapBasicEventBox[];
}
