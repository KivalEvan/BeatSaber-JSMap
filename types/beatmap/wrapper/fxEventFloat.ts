// deno-lint-ignore-file no-explicit-any
import type { EaseType } from '../../../beatmap/shared/constants.ts';
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapFxEventFloatAttribute extends IWrapBaseObjectAttribute {
   /** Relative beat time `<float>` to event box group. */
   time: number;
   /** Ease type `<int>` of FX event. */
   easing: EaseType;
   /** Use previous event value `<int>` in FX event. */
   previous: 0 | 1;
   /** Value `<float>` of FX event. */
   value: number;
}

export interface IWrapFxEventFloat<
   T extends Record<string, any> = IWrapFxEventFloatAttribute,
> extends IWrapBaseObject<T>, IWrapFxEventFloatAttribute {
   setPrevious(value: 0 | 1): this;
   setEasing(value: EaseType): this;
   setValue(value: number): this;
}
