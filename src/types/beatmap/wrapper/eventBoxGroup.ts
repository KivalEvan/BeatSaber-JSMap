import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';
import type { IWrapEventBox, IWrapEventBoxAttribute } from './eventBox.ts';

/**
 * Wrapper attribute for beatmap event box group.
 */
export interface IWrapEventBoxGroupAttribute extends IWrapBaseObjectAttribute {
   /**
    * Group ID of event box group
    *
    * **Type:** `i32`
    */
   id: number;
   boxes: IWrapEventBoxAttribute[];
}

/**
 * Wrapper for beatmap event box group.
 */
export interface IWrapEventBoxGroup extends IWrapBaseObject, IWrapEventBoxGroupAttribute {
   boxes: IWrapEventBox[];
}
