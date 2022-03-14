import { Serializable } from '../../shared/types/serializable.ts';

export interface ILightRotationBase {
    /** Add beat time `<float>` to event box group. */
    b: number;
    /** Use previous event rotation value `<int>` in light rotation. */
    p: 0 | 1;
    /** Ease type `<float>` of light rotation. */
    e: number;
    /** Loop count `<int>` in light rotation. */
    l: number;
    /** Rotation value `<float>` of light rotation.
     * ```ts
     * Left-side -> Clockwise
     * Right-side -> Counter-Clockwise
     * ```
     */
    r: number;
    /** Rotation direction `<int>` of light rotation.
     * ```ts
     * 0 -> Automatic
     * 1 -> Clockwise
     * 2 -> Counter-clockwise
     * ```
     */
    o: 0 | 1 | 2;
}

const defaultValue: Required<ILightRotationBase> = {
    b: 0,
    p: 0,
    e: 0,
    l: 0,
    r: 0,
    o: 0,
};

/** Light rotation for new lighting system. */
export class LightRotationBase extends Serializable<ILightRotationBase> {
    private b;
    private p;
    private e;
    private l;
    private r;
    private o;
    constructor(lightRotationBase: Required<ILightRotationBase>) {
        super();
        this.b = lightRotationBase.b;
        this.p = lightRotationBase.p;
        this.e = lightRotationBase.e;
        this.l = lightRotationBase.l;
        this.r = lightRotationBase.r;
        this.o = lightRotationBase.o;
    }

    static create(): LightRotationBase;
    static create(lightRotations: Partial<ILightRotationBase>): LightRotationBase;
    static create(
        ...lightRotations: Partial<ILightRotationBase>[]
    ): LightRotationBase[];
    static create(
        ...lightRotations: Partial<ILightRotationBase>[]
    ): LightRotationBase | LightRotationBase[] {
        const result: LightRotationBase[] = [];
        lightRotations?.forEach((lr) =>
            result.push(
                new LightRotationBase({
                    b: lr.b ?? defaultValue.b,
                    p: lr.p ?? defaultValue.p,
                    e: lr.e ?? defaultValue.e,
                    l: lr.l ?? defaultValue.l,
                    r: lr.r ?? defaultValue.r,
                    o: lr.o ?? defaultValue.o,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new LightRotationBase({
            b: defaultValue.b,
            p: defaultValue.p,
            e: defaultValue.e,
            l: defaultValue.l,
            r: defaultValue.r,
            o: defaultValue.o,
        });
    }

    toObject(): ILightRotationBase {
        return {
            b: this.time,
            p: this.previous,
            e: this.ease,
            l: this.loop,
            r: this.rotation,
            o: this.direction,
        };
    }

    /** Add beat time `<float>` to event box group. */
    get time() {
        return this.b;
    }
    set time(value: ILightRotationBase['b']) {
        this.b = value;
    }

    /** Use previous event rotation value `<int>` in light rotation. */
    get previous() {
        return this.p;
    }
    set previous(value: ILightRotationBase['p']) {
        this.p = value;
    }

    /** Ease type `<float>` of light rotation. */
    get ease() {
        return this.e;
    }
    set ease(value: ILightRotationBase['e']) {
        this.e = value;
    }

    /** Loop count `<int>` in light rotation. */
    get loop() {
        return this.l;
    }
    set loop(value: ILightRotationBase['l']) {
        this.l = value;
    }

    /** Rotation value `<float>` of light rotation.
     * ```ts
     * Left-side -> Clockwise
     * Right-side -> Counter-Clockwise
     * ```
     */
    get rotation() {
        return this.r;
    }
    set rotation(value: ILightRotationBase['r']) {
        this.r = value;
    }

    /** Rotation direction `<int>` of light rotation.
     * ```ts
     * 0 -> Automatic
     * 1 -> Clockwise
     * 2 -> Counter-clockwise
     * ```
     */
    get direction() {
        return this.o;
    }
    set direction(value: ILightRotationBase['o']) {
        this.o = value;
    }
}
