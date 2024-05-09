// deno-lint-ignore-file no-explicit-any
import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightColorEventBox,
   IWrapLightColorEventBoxAttribute,
} from './lightColorEventBox.ts';

export interface IWrapLightColorEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapLightColorEventBoxAttribute[];
}

export interface IWrapLightColorEventBoxGroup<
   T extends { [key: string]: any } = IWrapLightColorEventBoxGroupAttribute,
> extends IWrapEventBoxGroup<T>, IWrapLightColorEventBoxGroupAttribute {
   boxes: IWrapLightColorEventBox[];
}
