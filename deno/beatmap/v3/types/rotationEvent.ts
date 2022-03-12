import { IBaseObject, BaseObject } from './baseObject.ts';

/** Rotation event beatmap object. */
export interface IRotationEvent extends IBaseObject {
    /** Execution time `<int>` of rotation event.
     * ```ts
     * 0 -> Early
     * 1 -> Late
     * ```
     */
    e: 0 | 1;
    /** Clockwise rotation value `<float>` of rotation event. */
    r: number;
}

export class RotationEvent extends BaseObject<IRotationEvent> {
    private e;
    private r;
    constructor(rotationEvent: Required<IRotationEvent>) {
        super(rotationEvent);
        this.e = rotationEvent.e;
        this.r = rotationEvent.r;
    }

    static create(): RotationEvent;
    static create(rotationEvents: Partial<IRotationEvent>): RotationEvent;
    static create(...rotationEvents: Partial<IRotationEvent>[]): RotationEvent[];
    static create(
        ...rotationEvents: Partial<IRotationEvent>[]
    ): RotationEvent | RotationEvent[] {
        const result: RotationEvent[] = [];
        rotationEvents?.forEach((re) =>
            result.push(
                new RotationEvent({
                    b: re.b ?? 0,
                    e: re.e ?? 0,
                    r: re.r ?? 0,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new RotationEvent({
            b: 0,
            e: 0,
            r: 0,
        });
    }

    public toObject(): IRotationEvent {
        return {
            b: this.time,
            e: this.executionTime,
            r: this.rotation,
        };
    }

    get executionTime() {
        return this.e;
    }
    set executionTime(value: IRotationEvent['e']) {
        this.e = value;
    }

    get rotation() {
        return this.r;
    }
    set rotation(value: IRotationEvent['r']) {
        this.r = value;
    }
}
