// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';

export interface IWrapBaseObjectAttribute extends IWrapBaseItemAttribute {
   /** Beat time `<float>` of beatmap object. */
   time: number;
}

export interface IWrapBaseObject<
   T extends { [key: string]: any } = IWrapBaseObjectAttribute,
> extends IWrapBaseItem<T>, IWrapBaseObjectAttribute {
   setTime(value: number): this;
}
