// deno-lint-ignore-file no-explicit-any
import type { IWrapEventBoxGroup, IWrapEventBoxGroupAttribute } from './eventBoxGroup.ts';
import type {
   IWrapLightRotationEventBox,
   IWrapLightRotationEventBoxAttribute,
} from './lightRotationEventBox.ts';

export interface IWrapLightRotationEventBoxGroupAttribute extends IWrapEventBoxGroupAttribute {
   boxes: IWrapLightRotationEventBoxAttribute[];
}

export interface IWrapLightRotationEventBoxGroup<
   T extends { [key: string]: any } = IWrapLightRotationEventBoxGroupAttribute,
> extends IWrapEventBoxGroup<T>, IWrapLightRotationEventBoxGroupAttribute {
   boxes: IWrapLightRotationEventBox[];
}
