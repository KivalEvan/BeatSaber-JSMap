import { Serializable } from '../../shared/types/serializable.ts';

/** Basic building block of beatmap light. */
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

    static create(lightColor: Partial<ILightRotationBase> = {}): LightRotationBase {
        return new LightRotationBase({
            b: lightColor.b ?? 0,
            p: lightColor.p ?? 0,
            e: lightColor.e ?? 0,
            l: lightColor.l ?? 0,
            r: lightColor.r ?? 0,
            o: lightColor.o ?? 0,
        });
    }

    public toObject(): ILightRotationBase {
        return {
            b: this.time,
            p: this.previous,
            e: this.ease,
            l: this.loop,
            r: this.rotation,
            o: this.direction,
        };
    }

    get time() {
        return this.b;
    }
    set time(value: ILightRotationBase['b']) {
        this.b = value;
    }

    get previous() {
        return this.p;
    }
    set previous(value: ILightRotationBase['p']) {
        this.p = value;
    }

    get ease() {
        return this.e;
    }
    set ease(value: ILightRotationBase['e']) {
        this.e = value;
    }

    get loop() {
        return this.l;
    }
    set loop(value: ILightRotationBase['l']) {
        this.l = value;
    }

    get rotation() {
        return this.r;
    }
    set rotation(value: ILightRotationBase['r']) {
        this.r = value;
    }

    get direction() {
        return this.o;
    }
    set direction(value: ILightRotationBase['o']) {
        this.o = value;
    }
}
