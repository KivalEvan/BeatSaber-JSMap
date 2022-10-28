import { WrapEventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { IWrapLightRotationEventBoxGroup } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import { IWrapLightRotationEventBox } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';

/** Light rotation event box group beatmap class object. */
export abstract class WrapLightRotationEventBoxGroup<T extends Record<keyof T, unknown>>
    extends WrapEventBoxGroupTemplate<T>
    implements IWrapLightRotationEventBoxGroup {
    abstract get events(): IWrapLightRotationEventBox[];
    abstract set events(value: IWrapLightRotationEventBox[]);
}
