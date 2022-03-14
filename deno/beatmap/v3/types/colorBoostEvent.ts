import { IBaseObject, BaseObject } from './baseObject.ts';

export interface IColorBoostEvent extends IBaseObject {
    /** Toggle `<boolean>` of boost event. */
    o: boolean;
}

const defaultValue: Required<IColorBoostEvent> = {
    b: 0,
    o: false,
};

/** Boost event beatmap object. */
export class ColorBoostEvent extends BaseObject<IColorBoostEvent> {
    private o;
    constructor(boostEvent: Required<IColorBoostEvent>) {
        super(boostEvent);
        this.o = boostEvent.o;
    }

    static create(): ColorBoostEvent;
    static create(colorBoostEvents: Partial<IColorBoostEvent>): ColorBoostEvent;
    static create(...colorBoostEvents: Partial<IColorBoostEvent>[]): ColorBoostEvent[];
    static create(
        ...colorBoostEvents: Partial<IColorBoostEvent>[]
    ): ColorBoostEvent | ColorBoostEvent[] {
        const result: ColorBoostEvent[] = [];
        colorBoostEvents?.forEach((be) =>
            result.push(
                new ColorBoostEvent({
                    b: be.b ?? defaultValue.b,
                    o: be.o ?? defaultValue.o,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new ColorBoostEvent({
            b: defaultValue.b,
            o: defaultValue.o,
        });
    }

    toObject(): IColorBoostEvent {
        return {
            b: this.time,
            o: this.toggle,
        };
    }

    /** Toggle `<boolean>` of boost event. */
    get toggle() {
        return this.o;
    }
    set toggle(value: IColorBoostEvent['o']) {
        this.o = value;
    }
}
