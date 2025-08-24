import type { IWrapBaseObject } from './baseObject.ts';
import type { IWrapEventBox } from './eventBox.ts';

/**
 * Wrapper attribute for beatmap event box group.
 */
export interface IWrapEventBoxGroup extends IWrapBaseObject {
   /**
    * Group ID of event box group
    *
    * **Type:** `i32`
    */
   id: number;
   boxes: IWrapEventBox[];
}
