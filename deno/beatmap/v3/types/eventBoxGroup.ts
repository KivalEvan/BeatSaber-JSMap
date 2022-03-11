import { IBaseObject, BaseObject } from './baseObject.ts';

export interface IEventBoxGroup extends IBaseObject {
    /** Group ID `<int>` of event box group */
    g: number;
}

export abstract class EventBoxGroup extends BaseObject<IEventBoxGroup> {
    /** Group ID `<int>` of event box group */
    private g;
    constructor(eventBoxGroup: IEventBoxGroup) {
        super(eventBoxGroup);
        this.g = eventBoxGroup.g;
    }

    /** Toggle `<boolean>` of boost event. */
    get groupID() {
        return this.g;
    }
    set groupID(value: IEventBoxGroup['g']) {
        this.g = value;
    }
}
