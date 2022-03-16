import { IEventBoxGroup } from './eventBoxGroup.ts';

export interface IEventBoxGroupTemplate<T> extends IEventBoxGroup {
    e: T[];
}
