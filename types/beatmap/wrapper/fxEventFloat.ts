// deno-lint-ignore-file no-explicit-any
import { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapFxEventFloatAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseObjectAttribute<T> {
   /** Relative beat time `<float>` to event box group. */
   time: number;
   /** Ease type `<int>` of FX event. */
   easing: number;
   /** Use previous event value `<int>` in FX event. */
   previous: 0 | 1;
   /** Value `<float>` of FX event. */
   value: number;
}

export interface IWrapFxEventFloat<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseObject<T>, IWrapFxEventFloatAttribute<T> {
   setPrevious(value: 0 | 1): this;
   setEasing(value: number): this;
   setValue(value: number): this;
}
