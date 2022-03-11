import { Serializable } from '../../shared/types/serializable.ts';
import { IEventBoxGroup, EventBoxGroup } from './eventBoxGroup.ts';

export interface IEventBoxGroupTemplate<T> extends IEventBoxGroup {
    e: T[];
}

export abstract class EventBoxGroupTemplate<
    T,
    U extends Serializable<T>
> extends EventBoxGroup {
    private e: U[];

    constructor(eventBoxGroup: IEventBoxGroupTemplate<T>, objects: U[]) {
        super(eventBoxGroup);
        this.e = objects;
    }

    public toObject(): IEventBoxGroupTemplate<T> {
        return {
            b: this.time,
            g: this.groupID,
            e: this.events.map((e) => e.toObject()),
        };
    }

    get events() {
        return this.e;
    }
    set events(value: U[]) {
        this.e = value;
    }
}
