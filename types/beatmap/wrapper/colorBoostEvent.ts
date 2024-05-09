// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapColorBoostEventAttribute extends IWrapBaseObjectAttribute {
   /** Toggle `<boolean>` of boost event. */
   toggle: boolean;
}

export interface IWrapColorBoostEvent<
   T extends { [key: string]: any } = IWrapColorBoostEventAttribute,
> extends IWrapBaseObject<T>, IWrapColorBoostEventAttribute {
   setToggle(value: boolean): this;
}
