import { EventBoxGroup } from './eventBoxGroup.ts';

export interface EventBoxGroupTemplate<T> extends EventBoxGroup {
    e: T[];
}
