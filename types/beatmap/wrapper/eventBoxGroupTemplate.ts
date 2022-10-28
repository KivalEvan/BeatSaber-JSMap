import { IWrapEventBoxGroup } from './eventBoxGroup.ts';

export interface IWrapEventBoxGroupTemplate<T> extends IWrapEventBoxGroup {
    events: T[];
}
