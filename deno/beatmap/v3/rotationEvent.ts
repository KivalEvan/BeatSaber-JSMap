import { IRotationEvent } from '../../types/beatmap/v3/rotationEvent.ts';
import { BaseObject } from './baseObject.ts';

/** Rotation event beatmap object. */
export class RotationEvent extends BaseObject<IRotationEvent> {
    static default: Required<IRotationEvent> = {
        b: 0,
        e: 0,
        r: 0,
    };

    private constructor(rotationEvent: Required<IRotationEvent>) {
        super(rotationEvent);
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
                    b: re.b ?? RotationEvent.default.b,
                    e: re.e ?? RotationEvent.default.e,
                    r: re.r ?? RotationEvent.default.r,
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
            b: RotationEvent.default.b,
            e: RotationEvent.default.e,
            r: RotationEvent.default.r,
        });
    }

    toObject(): IRotationEvent {
        return {
            b: this.time,
            e: this.executionTime,
            r: this.rotation,
        };
    }

    /** Execution time `<int>` of rotation event.
     * ```ts
     * 0 -> Early
     * 1 -> Late
     * ```
     */
    get executionTime() {
        return this.data.e;
    }
    set executionTime(value: IRotationEvent['e']) {
        this.data.e = value;
    }

    /** Clockwise rotation value `<float>` of rotation event. */
    get rotation() {
        return this.data.r;
    }
    set rotation(value: IRotationEvent['r']) {
        this.data.r = value;
    }

    setExecutionTime(value: IRotationEvent['e']) {
        this.executionTime = value;
        return this;
    }
    setRotation(value: IRotationEvent['r']) {
        this.rotation = value;
        return this;
    }
}