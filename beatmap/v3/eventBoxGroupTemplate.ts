import { IEventBoxGroupTemplate } from '../../types/beatmap/v3/eventBoxGroupTemplate.ts';
import { Serializable } from '../shared/serializable.ts';
import { EventBoxGroup } from './eventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { IEventBox } from '../../types/beatmap/v3/eventBox.ts';

/** Base event box group template beatmap v3 class object. */
export abstract class EventBoxGroupTemplate<T extends IEventBox, U extends Serializable<T>> extends EventBoxGroup {
    private _e: U[];

    protected constructor(eventBoxGroup: Required<IEventBoxGroupTemplate<T>>, objects: U[]) {
        super(eventBoxGroup);
        this._e = objects;
    }

    toJSON(): Required<IEventBoxGroupTemplate<T>> {
        return {
            b: this.time,
            g: this.groupID,
            e: this.events.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get events() {
        return this._e;
    }
    set events(value: U[]) {
        this._e = value;
    }
}
