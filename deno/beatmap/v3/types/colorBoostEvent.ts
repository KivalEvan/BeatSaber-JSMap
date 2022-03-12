import { IBaseObject, BaseObject } from './baseObject.ts';

/** Boost event beatmap object. */
export interface IColorBoostEvent extends IBaseObject {
    /** Toggle `<boolean>` of boost event. */
    o: boolean;
}

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
                    b: be.b ?? 0,
                    o: be.o ?? false,
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
            b: 0,
            o: false,
        });
    }

    public toObject(): IColorBoostEvent {
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
