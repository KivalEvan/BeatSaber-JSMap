import { IBaseObject, BaseObject } from './baseObject.ts';

/** Boost event beatmap object. */
export interface IBoostEvent extends IBaseObject {
    /** Toggle `<boolean>` of boost event. */
    o: boolean;
}

/** Boost event beatmap object. */
export class BoostEvent extends BaseObject<IBoostEvent> {
    private o;
    constructor(boostEvent: IBoostEvent) {
        super(boostEvent);
        this.o = boostEvent.o;
    }

    public toObject(): IBoostEvent {
        return {
            b: this.time,
            o: this.toggle,
        };
    }

    /** Toggle `<boolean>` of boost event. */
    get toggle() {
        return this.o;
    }
    set toggle(value: IBoostEvent['o']) {
        this.o = value;
    }
}
