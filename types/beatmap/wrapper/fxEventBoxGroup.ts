// deno-lint-ignore-file no-explicit-any
import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type { IWrapFxEventBox, IWrapFxEventBoxAttribute } from './fxEventBox.ts';

export interface IWrapFxEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapFxEventBoxAttribute[];
}

export interface IWrapFxEventBoxGroup<
   T extends Record<string, any> = IWrapFxEventBoxGroupAttribute,
> extends IWrapEventBoxGroup<T>, IWrapFxEventBoxGroupAttribute {
   boxes: IWrapFxEventBox[];
}
