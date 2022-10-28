import { IWrapLightColorEventBox } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import { IWrapLightColorEventBoxGroup } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import { WrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';

/** Light color event box group beatmap class object. */
export abstract class WrapLightColorEventBoxGroup<T extends Record<keyof T, unknown>>
    extends WrapEventBoxGroupTemplate<T>
    implements IWrapLightColorEventBoxGroup {
    abstract get events(): IWrapLightColorEventBox[];
    abstract set events(value: IWrapLightColorEventBox[]);
}
