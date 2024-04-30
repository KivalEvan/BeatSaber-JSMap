// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapFxEventIntAttribute extends IWrapBaseObjectAttribute {
   /** Relative beat time `<float>` to event box group. */
   time: number;
   /** Use previous event value `<int>` in FX event. */
   previous: 0 | 1;
   /** Value `<int>` of FX event. */
   value: number;
}

export interface IWrapFxEventInt<
   T extends Record<string, any> = IWrapFxEventIntAttribute,
> extends IWrapBaseObject<T>, IWrapFxEventIntAttribute {
   setPrevious(value: 0 | 1): this;
   setValue(value: number): this;
}
