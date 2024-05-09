// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapBPMEventAttribute extends IWrapBaseObjectAttribute {
   /** Value `<float>` of BPM change event. */
   bpm: number;
}

export interface IWrapBPMEvent<
   T extends { [key: string]: any } = IWrapBPMEventAttribute,
> extends IWrapBaseObject<T>, IWrapBPMEventAttribute {
   setBPM(value: number): this;
}
