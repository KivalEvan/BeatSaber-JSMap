// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';
import type { IWrapEventBox, IWrapEventBoxAttribute } from './eventBox.ts';

export interface IWrapEventBoxGroupAttribute extends IWrapBaseObjectAttribute {
   /** Group ID `<int>` of event box group */
   id: number;
   boxes: IWrapEventBoxAttribute[];
}

export interface IWrapEventBoxGroup<
   T extends { [key: string]: any } = IWrapEventBoxGroupAttribute,
> extends IWrapBaseObject<T>, IWrapEventBoxGroupAttribute {
   boxes: IWrapEventBox[];
}
